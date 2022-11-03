import { createReducer, current } from "@reduxjs/toolkit";
import { actionTypes } from "../../../common/enum";

/*
 dictionary: {
   [string]: [
     ...words
   ]
 }
*/
const initialState = {
  //words in theme screen (no lazy loading)
  words: null,
  //plane words
  planeWords: null,
  //words with extra fields
  customWords: null,
  customWordsStudy: null,
  themes: null,
  //current opened word
  currentWord: null,
  //current opened theme card
  currentTheme: null,
  //selected themes on main page
  selectedThemes: null,
  loading: false,
  //loading words from user api
  customWordLoading: false,
  //lazy loading words in card
  allWordsLoading: false,
  //total words count on theme page
  total: 0,

};

export const wordsReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionTypes.SET_WORDS, (state, action) => {
    const { words } = action.payload;
    state.words = words;
  });
  builder.addCase(actionTypes.SET_WORDS_LOADING, (state, action) => {
    state.loading = action.payload;
  });
  builder.addCase(actionTypes.SET_CURRENT_WORD, (state, action) => {
    const id = action.payload;
    let currentWord = null;
    if (id && current(state.words)) {
      currentWord = current(state.words).find((el) => el.id == id);
    }

    state.currentWord = currentWord;
  });
  builder.addCase(actionTypes.SET_WORDS_THEMES, (state, action) => {
    const { themes } = action.payload;
    state.themes = themes;
  });
  builder.addCase(actionTypes.SET_SELECTED_THEMES, (state, action) => {
    const { themes } = action.payload;
    state.selectedThemes = themes;
  });
  builder.addCase(actionTypes.SET_CURRENT_THEME, (state, action) => {
    const theme = action.payload;
    state.currentTheme = theme;
  });
  builder.addCase(actionTypes.SET_WORDS_TOTAL_COUNT, (state, action) => {
    const { total } = action.payload;
    state.total = total;
  });
  builder.addCase(actionTypes.SET_PLANE_WORDS, (state, action) => {
    const { words } = action.payload;
    state.planeWords = words;
  });
  builder.addCase(actionTypes.SET_CUSTOM_WORDS, (state, action) => {
    const { words } = action.payload;
    state.customWords = words;
  });
  builder.addCase(actionTypes.SET_CUSTOM_STUDY_WORDS, (state, action) => {
    const { words } = action.payload;
    state.customWordsStudy = words;
  });
  builder.addCase(
    actionTypes.SET_CUSTOM_WORD_STATUS_LOADING,
    (state, action) => {
      const isLoading = action.payload;
      state.customWordLoading = isLoading;
    }
  );
  builder.addCase(actionTypes.SET_ALL_WORDS_LOADING, (state, action) => {
    const isLoading = action.payload;
    state.allWordsLoading = isLoading;
  });

});
