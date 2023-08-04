import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store,{persistor} from "./store/IndexStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import register from "RegisterServiceWorker";
const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
    // <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    // </React.StrictMode>
);
register();