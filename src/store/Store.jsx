import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CartSlice from "./CartSlice";

const persistConfig = {
    key: "root",
    version: 2,
    storage: storage,
};

const reducer = combineReducers({
    auth:AuthSlice ,
    cart: CartSlice,
})
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
