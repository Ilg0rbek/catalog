import { call, put } from "@redux-saga/core/effects";
import { alertTypes, toastsMessages } from "../../../common/enum";
import { UsersService, SettingsService } from "../../../services";
import { addToast } from "../../actions/app";
import {
  setSettingsProperties,
  setSettingsProperty,
} from "../../actions/settings";
import { updateUser } from "../../actions/users";
export function* fetchSettingsPropertiesWorker() {
  try {
    const response = yield call(SettingsService.getAllSettingsProperty);
    yield put(setSettingsProperties(response?.data));
  } catch (err) {
    yield put(
      addToast({
        type: alertTypes.ERROR,
        message: err?.response?.data?.message,
      })
    );
  }
}

export function* setSettingsPropertyWorker({ payload }) {
  try {
    const { key, value } = payload;
    const response = yield call(SettingsService.setSettingsProperty, {
      key,
      value,
    });
    
    if(key == 'PROMO') {

    yield call(UsersService.addHistory, {  
      userId:1,
      key,
      value 
       });
    }

    yield put(
      setSettingsProperty({
        key,
        value: response?.data[1].value,
        description: response?.data[1].description,
      })
    );

     yield put(
      addToast({
        type: alertTypes.SUCCESS,
        message: toastsMessages.PROMO_SAVED
      })
      )   

  } catch (err) {
    yield put(
      addToast({
        type: alertTypes.ERROR,
        message: err?.response?.data?.message,
      })
    );
  }
}

export function* checkPromoWorker({ payload }) {

  try {
    const { id, key, value } = payload;

    const response = yield call(UsersService.checkHistory, { userId: 1, key, value });

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  
    const data = {
      promo: value,
      isApproved:true,
      approveExpire:oneYearFromNow.getTime()
    }
  
   const updateuser = yield call(UsersService.updateUserById, { id, data }); 
   const addhistory = yield call(UsersService.addHistory, {  
      userId:1,
      key,
      value 
       });

   yield call(UsersService.deletePromo, {id, key, value}); 
   yield put(updateUser(updateuser?.data));

   yield put(
      addToast({
        type: alertTypes.SUCCESS,
        message: toastsMessages.PROMO_SUCCESS
      })
      )   

  } catch (err) {
    yield put(
      addToast({
        type: alertTypes.ERROR,
        message: err?.response?.data?.message,
      })
    );
  }
}
