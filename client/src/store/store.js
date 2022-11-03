import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducers/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import { sagaWatcherSaga as sagaWather } from "./saga/rootSaga";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["profile", "design", "dictionary"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  compose(applyMiddleware(sagaMiddleware))
);
let persistor = persistStore(store);

sagaMiddleware.run(sagaWather);

const dispatch = store.dispatch;
export { store, dispatch, persistor };
