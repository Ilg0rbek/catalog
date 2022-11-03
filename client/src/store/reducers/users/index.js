import { createReducer, current } from "@reduxjs/toolkit";
import { actionTypes } from "../../../common/enum/app/action-types.enum";

const initialState = {
  users: [],
  isLoading: false,
};

export const usersReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionTypes.SET_USERS, (state, action) => {
    const { users } = action.payload;
    state.users = users;
  });
  builder.addCase(actionTypes.UPDATE_USER, (state, action) => {
    const { user } = action.payload;

    state.users = current(state.users).map((el) => {
      if (el.id !== user.id) {
        return el;
      } else {
        return user;
      }
    });
  });
});
