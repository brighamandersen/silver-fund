import "./styles.css";
import React, { useState } from "react";
import { useLocalState } from "./utils/helpers";
import Header from "./components/shared/Header";
import Login from "./components/login/Login";
import Footer from "./components/shared/Footer";
import Panes from "./components/shared/Panes";

export const App = () => {
  const [token, setToken] = useLocalState("token");
  const [username, setUsername] = useLocalState("username");
  const [password, setPassword] = useState("");

  return (
    <>
      testd
      <Header
        token={token}
        setToken={setToken}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      {token ? (
        <Panes username={username} />
      ) : (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setToken={setToken}
        />
      )}
      <Footer />
    </>
  );
};

export default App;
