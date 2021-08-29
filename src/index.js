import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./utils/AuthContext";
import { BannerProvider } from "./utils/BannerContext";
import GlobalStyles from "./utils/GlobalStyles";

const AppWithProviders = (
  <AuthProvider>
    <BannerProvider>
      <GlobalStyles />
      <Router>
        <App />
      </Router>
    </BannerProvider>
  </AuthProvider>
);

ReactDOM.render(AppWithProviders, document.getElementById("root"));
