import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/auth";
import { Toaster } from "react-hot-toast";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <App />
        <Toaster />
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
