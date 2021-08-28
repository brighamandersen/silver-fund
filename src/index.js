import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./utils/AuthContext";
import { BannerProvider } from "./utils/BannerContext";

const AppWithProviders = (
  <AuthProvider>
    <BannerProvider>
      <App />
    </BannerProvider>
  </AuthProvider>
);

ReactDOM.render(AppWithProviders, document.getElementById("root"));
