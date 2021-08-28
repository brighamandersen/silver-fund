import "./styles.css";
import React from "react";
import Navbar from "./components/shared/Navbar";
import Login from "./components/login/Login";
import Footer from "./components/shared/Footer";
import Panes from "./components/shared/Panes";
import { useAuth } from "./utils/AuthContext";
import MsgBanner from "./components/shared/MsgBanner";

const App = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      <Navbar />
      <MsgBanner />
      {loggedIn ? <Panes /> : <Login />}
      <Footer />
    </>
  );
};

export default App;
