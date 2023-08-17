import { configureStore, combineReducers } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice"
import faveReducer from "./faveSlice";

import { 
    persistStore, 
    persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    global:shopReducer,
    // fave:faveReducer,
})

const persistConfig = {
    key:"root",
    storage,
}

const persistedReducer= persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        }),
})

export const persistor = persistStore(store);
export default store;