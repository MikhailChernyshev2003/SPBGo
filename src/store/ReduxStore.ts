import thunk from "redux-thunk";
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from "@redux-devtools/extension";
import {persistedReducer} from "./reducers/rootReducer";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import {configureStore} from "@reduxjs/toolkit";


export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type AppDispatch = typeof store.dispatch;