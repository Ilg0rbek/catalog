import { createReducer } from "@reduxjs/toolkit";
import { actionTypes } from "../../../common/enum/app/action-types.enum";

const initialState = {
  user: null,
  isLoading: false,
};

export const profileReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionTypes.SET_USER, (state, action) => {
    const { user } = action.payload;
    state.user = user;
  }); 
  builder.addCase(actionTypes.CASHOUT, (state, action) => {
    const { data } = action.payload;
    state.user.bonuses = 0;
  });
  builder.addCase(actionTypes.CLEAR_USER_DATA, (state, action) => {
    state.user = null;
  });
  builder.addCase(actionTypes.SET_USER_LOADING, (state, action) => {
    const { isLoading } = action.payload;
    state.isLoading = isLoading;
  });
});
