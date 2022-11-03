import { call, put } from "redux-saga/effects";
import { actionTypes } from "../../../common/enum/app/action-types.enum";
import { AuthService } from "../../../services";
import { CookieHelper, TokenHelper } from "../../../helpers";
import { addToast, redirect, resetLoading } from "../../actions/app";
import { alertTypes, appRoute, toastsMessages } from "../../../common/enum";
import { setUser, setUserLoading } from "../../actions/profile";
import { userRoles } from "../../../common/enum/user";
import { cookieNames } from "../../../common/constants";
import { fetchAllWords } from "../../actions/words";
import { setIsAuth } from "../../actions/auth";

export function* loginSagaWorker(action) {
  try {
    const { email, password, isForgot } = action.payload;
    yield put(setUserLoading(true));
    const response = yield call(AuthService.login, { email, password });
    TokenHelper.saveToken(response.data.accessToken);
    yield put(setUser(response.data.user));
    yield put(redirect(_getRoute(response.data.user)));
    yield put(setIsAuth(true))

    forgotUserCredentials({ email, password, isForgot });
  } catch (e) {
    yield put(
      addToast({ type: alertTypes.ERROR, message: e?.response?.data?.message })
    );
  } finally {
    yield put(setUserLoading(false));
  }
}

export function* vkSagaWorker(action) {
  try {
    const { vkId, referer } = action.payload;
    yield put(setUserLoading(true));
    const response = yield call(AuthService.vk, { vkId, referer });
    TokenHelper.saveToken(response.data.accessToken);
    yield put(setUser(response.data.user));
    yield put(redirect(_getRoute(response.data.user)));
    yield put(setIsAuth(true))
  } catch (e) {
    yield put(
      addToast({ type: alertTypes.ERROR, message: e?.response?.data?.message })
    );
  } finally {
    yield put(setUserLoading(false));
  }
}

export function* vkOauthSagaWorker(action) {
  try {
    const { code, referer } = action.payload;
    yield put(setUserLoading(true));
    const response = yield call(AuthService.oauthVk, { code, referer })
    TokenHelper.saveToken(response.data.accessToken);
    yield put(setUser(response.data.user));
    yield put(redirect(_getRoute(response.data.user)));
    yield put(setIsAuth(true))
  } catch (e) {
    yield put(
      addToast({ type: alertTypes.ERROR, message: e?.response?.data?.message })
    );
  } finally {
    yield put(setUserLoading(false));
  }
}

export function* googleAuthSagaWorker(action) {
  try {
    const { email, referer } = action.payload;
    yield put(setUserLoading(true));
    const response = yield call(AuthService.google, { email, referer });
    TokenHelper.saveToken(response.data.accessToken);
    yield put(setUser(response.data.user));
    yield put(redirect(_getRoute(response.data.user)));
    yield put(setIsAuth(true))
  } catch (e) {
    yield put(
      addToast({ type: alertTypes.ERROR, message: e?.response?.data?.message })
    );
  } finally {
    yield put(setUserLoading(false));
  }
}

export function* logoutSagaWorker() {
  try {
    TokenHelper.removeToken();
    yield put(setUser(null));
    yield put(setIsAuth(false))
    yield call(AuthService.logout);
  } catch (e) {
    console.log(e?.response?.data?.message);
  }
}

export function* registrationSagaWorker(action) {
  try {
    const { email, password, referer } = action.payload;
    yield put(setUserLoading(true));
    const response = yield call(AuthService.registration, { email, password, referer });
    TokenHelper.saveToken(response.data.accessToken);
    yield put(setIsAuth(true))
    yield put(setUser(response.data.user));
    yield put(redirect(_getRoute(response.data.user)));
  } catch (e) {
    yield put(
      addToast({ type: alertTypes.ERROR, message: e?.response?.data?.message })
    );
  } finally {
    yield put(setUserLoading(false));
  }
}

export function* checkAuth() {
  try {
    const response = yield call(AuthService.checkAuth);
    TokenHelper.saveToken(response.data.accessToken);
    yield put(setIsAuth(true))
    yield put(setUser(response.data.user));
  } catch (e) {
    //if token expired logout
    if (e.response.status === 401) {
      yield put({ type: actionTypes.LOGOUT });
    }
  }
}

export function* validateResetPasswordMail(action) {
  try {
    const { email } = action.payload;
    yield put(resetLoading(true));
    yield call(AuthService.checkResetPasswordEmail, { email });
    yield put(
      addToast({
        type: alertTypes.SUCCESS,
        message: `${toastsMessages.ACTIVATION_LINK_SEND_SUCCESS}: ${email}`,
      })
    );
  } catch (e) {
    console.log(e?.response?.data?.message);
    yield put(
      addToast({ type: alertTypes.ERROR, message: e?.response?.data?.message })
    );
  } finally {
    yield put(resetLoading(false));
  }
}
export function* updatePassword(action) {
  try {
    const { password, userId, token } = action.payload;
    yield put(resetLoading(true));
    yield call(AuthService.updatePassword, {
      password,
      userId,
      token,
    });
    yield put(
      addToast({
        type: alertTypes.SUCCESS,
        message: toastsMessages.UPDATE_PASSWORD_SUCCESS,
      })
    );
    yield put(redirect(appRoute.LOGIN));
  } catch (e) {
    console.log(e);
    yield put(
      addToast({ type: alertTypes.ERROR, message: e?.response?.data?.message })
    );
  } finally {
    yield put(resetLoading(false));
  }
}

function _getRoute(user) {
  const { role } = user;
  if (role == userRoles.ADMIN) {
    return appRoute.ADMIN;
  }
  if (role == userRoles.USER) {
    return appRoute.BASE;
  }
}

function forgotUserCredentials({ isForgot, email, password }) {
  if (isForgot) {
    CookieHelper.setCookie({ name: cookieNames.PASSWORD, value: password });
    CookieHelper.setCookie({ name: cookieNames.EMAIL, value: email });
  } else {
    if (CookieHelper.isExists(cookieNames.EMAIL))
      CookieHelper.clean(cookieNames.EMAIL);

    if (CookieHelper.isExists(cookieNames.PASSWORD))
      CookieHelper.clean(cookieNames.PASSWORD);
  }
}
