import { call, put } from "redux-saga/effects";
import { alertTypes, toastsMessages } from "../../../common/enum";
import { UsersService } from "../../../services";
import { addToast } from "../../actions/app";
import { setUsers, updateUser } from "../../actions/users";

export function* getUsersSagaWorker() {
  try {
    const response = yield call(UsersService.getAllUsers);
    yield put(setUsers(response?.data));
  } catch (err) {
    yield put(
      addToast({
        type: alertTypes.ERROR,
        message: err?.response?.data?.message,
      })
    );
  }
}

export function* approveUserWorker({ payload }) {
  try {
    const { id, isApproved = true } = payload;
    const response = yield call(UsersService.approveUserById, {
      id,
      isApproved,
    });
    yield put(updateUser(response?.data));
  } catch (err) {
    console.log(err?.response?.data?.message);
    yield put(
      addToast({
        type: alertTypes.ERROR,
        message: err?.response?.data?.message,
      })
    );
  }
}
export function* banUserWorker({ payload }) {
  try {
    const { id, isBanned = true } = payload;
    const response = yield call(UsersService.banUserById, { id, isBanned });
    yield put(updateUser(response?.data));
  } catch (err) {
    console.log(err?.response?.data?.message);
    yield put(
      addToast({
        type: alertTypes.ERROR,
        message: err?.response?.data?.message,
      })
    );
  }
}

export function* updateUserWorker({ payload }) {
  try {
    const { id, data } = payload;
    console.log('user worker id', id);
    console.log('update user worker', data);
    const response = yield call(UsersService.updateUserById, { id, data });
    yield put(updateUser(response?.data));
    yield put(
      addToast({
        type: alertTypes.SUCCESS,
        message: toastsMessages.SUCCESS_USER_DATA_UPDATE,
      })
    );
  } catch (err) {
    console.log(err?.response?.data?.message);
    yield put(
      addToast({
        type: alertTypes.ERROR,
        message: err?.response?.data?.message,
      })
    );
  }
}

export function* cashoutWorker({ payload }) {
  try {
    const { id, data } = payload;

    const cashoutRequest = yield call(UsersService.sendCashoutRequest, { id, data });
    data.bonuses = 0;

    const response = yield call(UsersService.updateUserById, { id, data });

    yield put(updateUser(response?.data));
    yield put(
      addToast({
        type: alertTypes.SUCCESS,
        message: toastsMessages.CASHOUT_REQUEST,
      })
    );
  } catch (err) {
    console.log(err?.response?.data?.message);
    yield put(
      addToast({
        type: alertTypes.ERROR,
        message: err?.response?.data?.message,
      })
    );
  }
}
