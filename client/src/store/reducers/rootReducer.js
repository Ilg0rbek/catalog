import { combineReducers } from "redux";
import { appReducer } from "./app";
import { authReducer } from "./auth";
import { designReducer } from "./design";
import { dictionaryReducer } from "./dictionary";
import { profileReducer } from "./profile";
import { settingsReducer } from "./settings";
import { usersReducer } from "./users";
import { wordsReducer } from "./words";

export const rootReducer = combineReducers({
  profile: profileReducer,
  app: appReducer,
  users: usersReducer,
  words: wordsReducer,
  design: designReducer,
  settings: settingsReducer,
  dictionary: dictionaryReducer,
  auth: authReducer,
});
