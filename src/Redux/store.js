import { compose, legacy_createStore } from "redux";
import rootReducer from "./Reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "persist-key",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = legacy_createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persister = persistStore(store);

export { persister, store };
