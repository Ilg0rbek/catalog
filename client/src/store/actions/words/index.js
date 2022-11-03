import { actionTypes } from "../../../common/enum";
import { setPageCount, setWordsLimit } from "../app";

const setWordsLoading = (isLoading) => {
  return {
    type: actionTypes.SET_WORDS_LOADING,
    payload: isLoading,
  };
};

const setAllWordsLoading = (isLoading) => {
  return {
    type: actionTypes.SET_ALL_WORDS_LOADING,
    payload: isLoading,
  };
};

const fetchWords = ({ limit, page, noImage, subjectId }) => {
  return {
    type: actionTypes.FETCH_WORDS_ASYNC,
    payload: { limit, page, noImage, subjectId },
  };
};

const fetchAllWords = (options) => {
  if (!options) { return }
  const { total, noImage, subjectId } = options;
  return {
    type: actionTypes.FETCH_ALL_WORDS_ASYNC,
    payload: { total, noImage, subjectId },
  };
};

const setWords = (words) => {
  return {
    type: actionTypes.SET_WORDS,
    payload: {
      words,
    },
  };
};
const setPlaneWords = (words) => {
  return {
    type: actionTypes.SET_PLANE_WORDS,
    payload: {
      words,
    },
  };
};
const setThemes = (themes) => {
  return {
    type: actionTypes.SET_WORDS_THEMES,
    payload: {
      themes,
    },
  };
};

const fetchThemes = () => {
  return {
    type: actionTypes.FETCH_WORDS_THEMES_ASYNC,
  };
};

const setCurrentWord = (id) => {
  return {
    type: actionTypes.SET_CURRENT_WORD,
    payload: id,
  };
};

const setSelectedThemes = (themes) => {
  return {
    type: actionTypes.SET_SELECTED_THEMES,
    payload: {
      themes,
    },
  };
};
const setCurrentTheme = (theme) => {
  return {
    type: actionTypes.SET_CURRENT_THEME,
    payload: theme,
  };
};
const setTotalWordsCount = (total) => {
  return {
    type: actionTypes.SET_WORDS_TOTAL_COUNT,
    payload: { total },
  };
};
const clearWords = () => {
  return {
    type: actionTypes.SET_WORDS,
    payload: {
      words: null,
    },
  };
};
const setCustomWordStatus = ({
  innerWordId,
  wordId,
  type,
  modified,
  days,
  isFinish,
  lastRepeatDate,
  isReplace,
  key,
  isDictionary,
}) => {
  return {
    type: actionTypes.SET_CUSTOM_WORD_ASYNC,
    payload: {
      type,
      wordId,
      innerWordId,
      modified,
      days,
      isFinish,
      lastRepeatDate,
      isReplace,
      key,
      isDictionary,
    },
  };
};
const setCustomWords = (words) => {
  return {
    type: actionTypes.SET_CUSTOM_WORDS,
    payload: {
      words,
    },
  };
};
const setCustomWordStatusLoading = (isLoading) => {
  return {
    type: actionTypes.SET_CUSTOM_WORD_STATUS_LOADING,
    payload: isLoading,
  };
};
const addCustomWord = ({ wordId }) => {
  return {
    type: actionTypes.ADD_CUSTOM_WORD_ASYNC,
    payload: {
      wordId,
    },
  };
};

const addCustomStudyWord = (words) => {
  return {
    type: actionTypes.SET_CUSTOM_STUDY_WORDS,
    payload: {
      words,
    },
  };
};
const setDictionaryWords = (dictionaryWords) => {
  return {
    type: actionTypes.SET_DICTIONARY_WORDS,
    payload: {
      dictionaryWords
    }
  }
}
export {
  setWordsLoading,
  fetchWords,
  setWords,
  setThemes,
  fetchThemes,
  setCurrentWord,
  setSelectedThemes,
  setCurrentTheme,
  setTotalWordsCount,
  clearWords,
  setCustomWordStatus,
  addCustomWord,
  setPlaneWords,
  setCustomWords,
  setCustomWordStatusLoading,
  addCustomStudyWord,
  fetchAllWords,
  setAllWordsLoading,
  setDictionaryWords
};
