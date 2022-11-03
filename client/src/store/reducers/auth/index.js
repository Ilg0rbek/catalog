import { createReducer } from "@reduxjs/toolkit";
import { actionTypes } from "../../../common/enum";

const initialState = {
  isAuth: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionTypes.SET_IS_AUTH, (state, action) => {
    state.isAuth = action.payload;
  });
});
