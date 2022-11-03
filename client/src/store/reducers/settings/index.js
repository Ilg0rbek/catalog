import { createReducer } from "@reduxjs/toolkit";
import { actionTypes } from "../../../common/enum";

const initialState = {
  WORDS_IN_LESSON: 10,
  WORDS_IN_LESSON_APPROWED: 5,
  REPEAT_START_PERIOD: 1,
  REPEAT_PERIOD_ITERATIONS_COUNT: 10,
  REPEAT_PERIOD_COEFFICIENT: 2,
  PROMO: 'Your promocode',
};

export const settingsReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionTypes.SET_SETTINGS_PROPERTY, (state, action) => {
    const { key, value, description } = action.payload;
    state[key] = { value, description };
  });
  builder.addCase(actionTypes.SET_SETTINGS_PROPERTIES, (state, action) => {
    const { properties } = action.payload;
    properties.forEach((property) => {
      state[property.key] = {
        value: property.value,
        description: property.description,
      };
    });
  });
});
