import { actionTypes } from "../../../common/enum";
import { createToast } from "../../../helpers";

function addToast(options = {}) {
  if (!options || !options.message) { return }
  return {
    payload: createToast(options),
    type: actionTypes.ADD_TOAST,
  };
}

function removeToast(id) {
  return {
    payload: id,
    type: actionTypes.REMOVE_TOAST,
  };
}

function redirect(route) {
  return {
    type: actionTypes.REDIRECT,
    payload: route,
  };
}

function clearRedirect() {
  return {
    type: actionTypes.CLEAR_REDIRECT,
    payload: null,
  };
}

function resetLoading(loading) {
  return {
    type: actionTypes.RESET_LOADING,
    payload: loading,
  };
}

const setWordsPageCount = (page) => {
  return {
    type: actionTypes.SET_WORDS_PAGE_PAGE,
    payload: page,
  };
};

const setWordsLimit = (limit) => {
  return {
    type: actionTypes.SET_WORDS_PAGE_LIMIT,
    payload: limit,
  };
};

const setThemesPageCount = (page) => {
  return {
    type: actionTypes.SET_THEMES_PAGE_PAGE,
    payload: page,
  };
};

const setThemesLimit = (limit) => {
  return {
    type: actionTypes.SET_THEMES_PAGE_LIMIT,
    payload: limit,
  };
};




export {
  addToast,
  removeToast,
  redirect,
  clearRedirect,
  resetLoading,
  setWordsPageCount,
  setWordsLimit,
  setThemesPageCount,
  setThemesLimit,
};
