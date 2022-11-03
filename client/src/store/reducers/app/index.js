import { createReducer, current } from "@reduxjs/toolkit";
import { actionTypes } from "../../../common/enum";

const initialState = {
  toasts: [],
  redirect: null,
  resetLoading: false,
  //words-page
  words_limit: 10,
  words_page: 1,
  //theme_page
  themes_limit: 12,
  themes_page: 1,
  moda_ref: false,
  moda_promo: false,
};

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionTypes.ADD_TOAST, (state, action) => {
    if (current(state).toasts) {
      state.toasts = [...current(state).toasts, action.payload];
    } else {
      state.toasts = [action.payload];
    }
  });
  builder.addCase(actionTypes.REMOVE_TOAST, (state, action) => {
    if (state.toasts) {
      state.toasts = current(state).toasts.filter(
        (toast) => toast.id !== action.payload
      );
    }
  });
  builder.addCase(actionTypes.REDIRECT, (state, action) => {
    state.redirect = action.payload;
  });
  builder.addCase(actionTypes.CLEAR_REDIRECT, (state, action) => {
    state.redirect = null;
  });
  builder.addCase(actionTypes.RESET_LOADING, (state, action) => {
    state.resetLoading = action.payload;
  });
  builder.addCase(actionTypes.SET_WORDS_PAGE_LIMIT, (state, action) => {
    state.words_limit = action.payload;
  });
  builder.addCase(actionTypes.SET_WORDS_PAGE_PAGE, (state, action) => {
    state.words_page = action.payload;
  });
  builder.addCase(actionTypes.SET_THEMES_PAGE_LIMIT, (state, action) => {
    state.themes_limit = action.payload;
  });
  builder.addCase(actionTypes.SET_THEMES_PAGE_PAGE, (state, action) => {
    state.themes_page = action.payload;
  });
  builder.addCase(actionTypes.OPEN_MODAL_REF, (state, action) => {
    state.menu_ref = action.payload;
  });
  builder.addCase(actionTypes.OPEN_MODAL_PROMO, (state, action) => {
    state.menu_promo = action.payload;
  });
});
