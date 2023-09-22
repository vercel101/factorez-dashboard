import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store, persister } from "./Redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate  persistor={persister}>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </PersistGate>
        </BrowserRouter>
    </Provider>
);
