import { endpointEnum } from "../../common/enum";
import { $api_user, $api_word, arrayQueryParser } from "../../helpers";
export class WordsService {
  static getAllWords({ limit }) {
    return $api_word.get(endpointEnum.ALL_WORDS, {
      params: { limit },
    });
  }
  static getWordsByIds({ ids }) {
    return $api_word.post(`${endpointEnum.GET_PLANE_WORD_BY_ID}`, {
      ids: arrayQueryParser(ids),
    });
  }
  static getWords({ limit, page, subjectId, noImage }) {
    let params = { limit, page, noImage };
    if (subjectId) {
      params = { ...params, subjectId };
    }
    return $api_word.get(endpointEnum.ALL_WORDS, {
      params: params,
    });
  }

  static getIdiomsByIds({ ids }) {
    return $api_word.post(`${endpointEnum.GET_PLANE_IDIOM_BY_ID}`, {
      ids: arrayQueryParser(ids),
    });
  }

  static getAllThemes() {
    return $api_word.get(endpointEnum.ALL_THEMES);
  }
  static getWordsByTheme({ subjectId }) {
    return $api_word.get(endpointEnum.ALL_WORDS, {
      params: {
        subjectId,
      },
    });
  }
  //Custom data
  static getUserWords({ id, type = null }) {
    return $api_user.get(`${endpointEnum.GET_USER_CUSTOM_WORDS}`, {
      params: { id, type },
    });
  }
  static getAllCustomWords() {
    return $api_user.get(`${endpointEnum.GET_ALL_CUSTOM_WORDS}`);
  }
  static addCustomWord({ wordId }) {
    return $api_user.post(`${endpointEnum.ADD_WORD}`, { wordId });
  }
  static addUserWord({ wordId, userId, type }) {
    return $api_user.post(`${endpointEnum.ADD_USER_WORD}`, {
      wordId,
      userId,
      type,
    });
  }
  static checkCustomWordOnExists({ wordId }) {
    return $api_user.get(
      `${endpointEnum.CHECK_CUSTOM_WORD_ON_EXISTS}/${wordId}`
    );
  }
  static setUserWordType({
    wordId,
    userId,
    type,
    days,
    isFinish,
    lastRepeatDate,
  }) {
    return $api_user.put(`${endpointEnum.SET_USER_WORD_STATUS}`, {
      wordId,
      userId,
      type,
      days,
      isFinish,
      lastRepeatDate,
    });
  }
}
