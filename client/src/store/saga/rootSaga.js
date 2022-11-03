import { takeEvery } from "redux-saga/effects";
import { actionTypes } from "../../common/enum/app/action-types.enum";
import {
  checkAuth,
  loginSagaWorker,
  vkSagaWorker,
  googleAuthSagaWorker,
  logoutSagaWorker,
  registrationSagaWorker,
  updatePassword,
  vkOauthSagaWorker,
  validateResetPasswordMail,
} from "./auth";
import { fetchCards, fetchCardsSizes, updateCardById } from "./design";
import {
  fetchSettingsPropertiesWorker,
  setSettingsPropertyWorker,
  checkPromoWorker,
} from "./settings";
import {
  getUsersSagaWorker,
  approveUserWorker,
  banUserWorker,
  updateUserWorker,
  cashoutWorker,
  checkSagaWorker
} from "./users";
import {
  addUserWordWorker,
  fetchAllWordsWorker,
  fetchCustomWordsWorker,
  fetchWordsThemesWorker,
  fetchWordsWorker,
} from "./words";

export function* sagaWatcherSaga() {
  //Auth sagas
  yield takeEvery(actionTypes.LOGIN, loginSagaWorker);
  yield takeEvery(actionTypes.VK, vkSagaWorker);
  yield takeEvery(actionTypes.VKOAUTH, vkOauthSagaWorker);
  yield takeEvery(actionTypes.GOOGLE, googleAuthSagaWorker);
  yield takeEvery(actionTypes.LOGOUT, logoutSagaWorker);
  yield takeEvery(actionTypes.REGISTRATION, registrationSagaWorker);
  yield takeEvery(actionTypes.CHECK_AUTH_STATUS, checkAuth);
  yield takeEvery(actionTypes.CASHOUT, cashoutWorker);
  yield takeEvery(actionTypes.CHECKPROMO, checkPromoWorker);
  //Users sagas
  yield takeEvery(actionTypes.GET_ALL_USERS, getUsersSagaWorker);
  yield takeEvery(actionTypes.APPROVE_USER, approveUserWorker);
  yield takeEvery(actionTypes.BAN_USER, banUserWorker);
  yield takeEvery(actionTypes.UPDATE_USER_ASYNC, updateUserWorker);
  yield takeEvery(
    actionTypes.CHECK_EMAIL_RESET_PASSWORD,
    validateResetPasswordMail
  );
  yield takeEvery(actionTypes.UPDATE_PASSWORD, updatePassword);
  //Words sagas
  yield takeEvery(actionTypes.FETCH_WORDS_ASYNC, fetchWordsWorker);
  yield takeEvery(actionTypes.FETCH_ALL_WORDS_ASYNC, fetchAllWordsWorker);
  yield takeEvery(actionTypes.FETCH_WORDS_THEMES_ASYNC, fetchWordsThemesWorker);
  //CustomWords
  yield takeEvery(actionTypes.SET_CUSTOM_WORD_ASYNC, addUserWordWorker);
  //Design sagas
  yield takeEvery(actionTypes.FETCH_CARDS_ASYNC, fetchCards);
  yield takeEvery(actionTypes.FETCH_CARDS_SIZE_TYPES_ASYNC, fetchCardsSizes);
  yield takeEvery(actionTypes.UPDATE_CARD_ASYNC, updateCardById);
  yield takeEvery(actionTypes.FETCH_CUSTOM_WORDS_ASYNC, fetchCustomWordsWorker);
  //Settings
  yield takeEvery(
    actionTypes.FETCH_ALL_SETTINGS_PROPERTIES_ASYNC,
    fetchSettingsPropertiesWorker
  );
  yield takeEvery(actionTypes.SET_SETTINGS_PROPERTIES_ASYNC, setSettingsPropertyWorker);
}
