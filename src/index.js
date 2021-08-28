import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./utils/AuthContext";

const AppWithAuth = (
  <AuthProvider>
    <App />
  </AuthProvider>
);

ReactDOM.render(AppWithAuth, document.getElementById("root"));
