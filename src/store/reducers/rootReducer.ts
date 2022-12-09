import {combineReducers} from "redux";
import reducers from "./reducers";
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'counter',
    storage,
};

export const rootReducer = combineReducers(reducers)

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootReducerType = ReturnType<typeof rootReducer>;