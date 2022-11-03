import { createReducer } from "@reduxjs/toolkit";
import { actionTypes } from "../../../common/enum/app/action-types.enum";

const initialState = {
  //all dictionary words
  dictionaryWords: null,
};

export const dictionaryReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionTypes.SET_DICTIONARY_WORDS, (state, action) => {
    const { dictionaryWords } = action.payload;
    state.dictionaryWords = dictionaryWords;
  });
});
