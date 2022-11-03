export const endpointEnum = Object.freeze({
  //Auth
  LOGIN: "/auth/login",
  REGISTRATION: "/auth/registration",
  VK: "/auth/vk",
  VKOAUTH: "/auth/vk-oauth",
  GOOGLE: "/auth/google",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",
  CHECK_RESET_USER_MAIL: "/auth/reset-password",
  UPDATE_PASSWORD: "/auth/reset",
  //Users
  GET_ALL_USERS: "/users/all",
  APPROVE_USER: "/users/approve",
  BAN_USER: "/users/delete",
  UPDATE_USER: "/users",
  CASHOUT_REQUEST: "/users/cashout",
  ADD_HISTORY: "/users/addhistory",
  CHECK_HISTORY: "/users/checkhistory",
  DELETE_PROMO: "/users/deletepromo",

  //Idioms
  GET_PLANE_IDIOM_BY_ID: "/idiom/list/ids",

  //Words
  ALL_WORDS: "/translation/list",
  ALL_THEMES: "/subject",
  ADD_WORD: "/words",
  GET_PLANE_WORD_BY_ID: "/translation/list/ids",
  //Custom words
  ADD_USER_WORD: "/users/add/word",
  SET_USER_WORD_STATUS: "/users/set/word",
  GET_USER_CUSTOM_WORDS: "/users/get/words",
  CHECK_CUSTOM_WORD_ON_EXISTS: "/words/check",
  GET_ALL_CUSTOM_WORDS: "/words/all",
  //Design
  FETCH_ALL_CARDS: "/design/cards/all",
  FETCH_ALL_CARDS_SIZE_TYPES: "/design/cards/sizes/all",
  SET_CARD: "/design/cards",
  //Images
  ADD_IMAGE: "/images",
  //Settings
  SET_SETTINGS_PROPERTY: "/settings",
  GET_SETTINGS_PROPERTY: "/settings",
  GET_ALL_SETTINGS_PROPERTY: "/settings/all",
});
