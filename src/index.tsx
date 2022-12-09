// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './css/index.css';
// import App from './App';
//
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from './store/ReduxStore';
import App from "./App";
import {ThemeProvider} from "styled-components"
import {isMobile} from "react-device-detect";
import "./css/App.css";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';


let persistor = persistStore(store);

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate persistor={persistor}>
            <ThemeProvider theme={{
                isMobile: isMobile
            }}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
