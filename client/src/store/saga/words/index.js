import { call, put, select } from "redux-saga/effects";
import { CommonAppConstants } from "../../../common/constants";
import { alertTypes, progressStudyEnum } from "../../../common/enum";
import {
  compareWords,
  dictionaryConverter,
  replaceWord,
} from "../../../helpers";
import { replaceDictionaryWord } from "../../../helpers/utils/word-transform.util";

import { UsersService, WordsService } from "../../../services";
import { addToast } from "../../actions/app";
import {
  setAllWordsLoading,
  setCustomWords,
  setCustomWordStatusLoading,
  setDictionaryWords,
  setPlaneWords,
  setThemes,
  setTotalWordsCount,
  setWords,
  setWordsLoading,
} from "../../actions/words";
import {
  geDictionaryWordsSelector,
  getUserSelector,
  getWordsSelector,
} from "../selectors";

export function* fetchWordsWorker({ payload }) {
  try {
    yield put(setWordsLoading(true));
    //fetch words only with images
    let { page, limit, subjectId, noImage = false } = payload;
    const { id } = yield select(getUserSelector);
    if (!limit) {
      limit = CommonAppConstants.MAX_LIMIT;
    }
    if (!page) {
      page = 0;
    }
    const planeWords = yield call(WordsService.getWords, {
      page,
      limit,
      subjectId,
      noImage,
    });
    const customWords = yield call(WordsService.getUserWords, {
      id,
    });

    const words = yield call(compareWords, {
      words: planeWords.data.data,
      customWords: customWords.data.words,
    });

    yield put(setWords(words));
    yield put(setTotalWordsCount(planeWords.data.total));
    yield put(setPlaneWords(planeWords.data.data));
  } catch (err) {
    yield put(
      addToast({
        type: alertTypes.ERROR,
        message: err?.response?.data?.message,
      })
    );
  } finally {
    yield put(setWordsLoading(false));
  }
}

export function* fetchAllWordsWorker({ payload }) {
  // try {
  //   yield put(setAllWordsLoading(true));
  //   //fetch words only with images
  //   let { total: limit, subjectId, noImage = false } = payload;
  //   //const { id } = yield select(getUserSelector);
  //   const { id } = yield select(getUserSelector);
  //   const planeWords = yield call(WordsService.getAllWords, {
  //     limit: CommonAppConstants.MAX_LIMIT,
  //   });
  //   const customWords = yield call(WordsService.getUserWords, {
  //     id,
  //   });
  //   console.log("customWords", customWords);
  //   const words = yield call(compareWords, {
  //     words: planeWords.data.data,
  //     customWords: customWords.data.words,
  //   });
  //   console.log("plane words all words", planeWords);
  //   const convertedWords = yield call(dictionaryConverter, {
  //     words,
  //   });
  //   console.log("convertedWords", convertedWords);
  //   yield put(setDictionaryWords(convertedWords));
  // } catch (err) {
  //   console.log(err?.response?.data?.message);
  //   yield put(
  //     addToast({
  //       type: alertTypes.ERROR,
  //       message: err?.response?.data?.message,
  //     })
  //   );
  // } finally {
  //   yield put(setAllWordsLoading(false));
  // }
}
export function* fetchCustomWordsWorker() {
  try {
    yield put(setWordsLoading(true));
    const { id } = yield select(getUserSelector);
    const customWords = yield call(WordsService.getUserWords, {
      id,
    });

    if (customWords.data.words.length !== 0) {
      const planeWords = yield call(WordsService.getWordsByIds, {
        ids: customWords.data.words.map((word) => word.wordId),
      });

      const planeIdioms = yield call(WordsService.getIdiomsByIds, {
        ids: customWords.data.words.map((word) => word.wordId),
      });

      const words = yield call(compareWords, {
        words: [...planeWords.data.data, ...planeIdioms.data.data],
        customWords: customWords.data.words,
        onlyCustom: true,
      });

      yield put(setCustomWords(words));
    } else {
      yield put(setCustomWords([]));
    }
  } catch (err) {
    console.log(err?.response?.data?.message);
    yield put(
      addToast({
        type: alertTypes.ERROR,
        message: err?.response?.data?.message,
      })
    );
  } finally {
    yield put(setWordsLoading(false));
  }
}

export function* addUserWordWorker({ payload }) {
  try {
    //add user words or set
    let {
      innerWordId,
      type,
      days,
      isFinish,
      lastRepeatDate,
      isReplace = false,
      isDictionary = false,
      key,
    } = payload;

    let wordId = null;
    yield put(setCustomWordStatusLoading(true));
    const { id: userId } = yield select(getUserSelector);

    const checkOnExists = yield call(WordsService.checkCustomWordOnExists, {
      wordId: innerWordId,
    });

    if (!checkOnExists.data.isExists) {
      const newWord = yield call(WordsService.addCustomWord, {
        wordId: innerWordId,
      });
      wordId = newWord.data.id;
    } else {
      wordId = checkOnExists.data.word.id;
    }

    const words = yield select(getWordsSelector);
    const customWord = yield call(WordsService.setUserWordType, {
      userId,
      wordId,
      type,
      days,
      isFinish,
      lastRepeatDate,
    });

    // if (isReplace) {
    //   if (isDictionary) {

    //     console.log("is dictionary worked");
    //     const dictionaryWords = yield select(geDictionaryWordsSelector);
    //     console.log(
    //       ` dictionaryWords,
    //     key,
    //     customWord: customWord.data.words[0]`,
    //       dictionaryWords,
    //       key,
    //       customWord.data.words[0]
    //     );
    //     const replacedWords = yield call(replaceDictionaryWord, {
    //       dictionaryWords,
    //       key,
    //       customWord: customWord.data.words[0],
    //     });

    //     yield put(setDictionaryWords(replacedWords));
    //   } else {
    //     const replacedWords = yield call(replaceWord, {
    //       words,
    //       customWord: customWord.data.words[0],
    //     });

    //     yield put(setWords(replacedWords));
    //   }
    // }
  } catch (err) {
    console.log("addUserWordWorker err", err);
    console.log("addUserWordWorker", err?.response?.data?.message);
    yield put(
      addToast({
        type: alertTypes.ERROR,
        message: err?.response?.data?.message,
      })
    );
  } finally {
    console.log("finally");
    yield put(setCustomWordStatusLoading(false));
  }
}

export function* fetchWordsThemesWorker() {
  try {
    yield put(setWordsLoading(true));

    const response = yield call(WordsService.getAllThemes);
    yield put(setThemes(response.data.data));
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setWordsLoading(false));
  }
}
