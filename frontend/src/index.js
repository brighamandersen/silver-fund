import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { API_BACKEND_URL, API_AUTH_CREDENTIALS } from "./utils/constants";

axios.defaults.baseURL = API_BACKEND_URL;
axios.defaults.auth = API_AUTH_CREDENTIALS;

ReactDOM.render(<App />, document.getElementById("root"));
