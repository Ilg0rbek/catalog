import { createReducer } from "@reduxjs/toolkit";
import { actionTypes } from "../../../common/enum";

const initialState = {
  cards: null,
  cardsSizeTypes: null,
  defaultCardsSizeType: null,
  loading: false,
};

export const designReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionTypes.SET_CARDS, (state, action) => {
    const { cards } = action.payload;
    state.cards = cards;
  });
  builder.addCase(actionTypes.SET_CARDS_SIZE_TYPES, (state, action) => {
    const { cardsSizeTypes } = action.payload;
    state.cardsSizeTypes = cardsSizeTypes;
  });
  builder.addCase(actionTypes.SET_CARDS_LOADER, (state, action) => {
    const { loading } = action.payload;
    state.loading = loading;
  });
  builder.addCase(actionTypes.SET_DEFAULT_CARD_SIZE_TYPE, (state, action) => {
    const { size } = action.payload;
    state.defaultCardsSizeType = size;
  });
});
