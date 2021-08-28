import "./styles.css";
import React, { useState } from "react";
import useLocalStorage from "./utils/useLocalStorage";
import Navbar from "./components/shared/Navbar";
import Login from "./components/login/Login";
import Footer from "./components/shared/Footer";
import Panes from "./components/shared/Panes";
import { AuthProvider, useAuth } from "./utils/AuthContext";

const App = () => {
  // const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", false);
  // const [username, setUsername] = useLocalStorage("username", null);

  // const logIn = (uname) => {
  //   setLoggedIn(true);
  //   setUsername(uname);
  // };

  // const logOut = () => {
  //   setLoggedIn(false);
  //   setUsername(null);
  // };

  const { loggedIn } = useAuth();

  return (
    <>
      <Navbar />
      {loggedIn ? <Panes /> : <Login />}
      <Footer />
    </>
  );
};

export default App;
