import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Content } from "../shared/SharedStyles";
import MsgBanner from "../shared/MsgBanner";
import LoginIntro from "./LoginIntro";
import LoginBox from "./LoginBox";

const IntroLoginWrapper = styled(Content)`
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: space-evenly;
  min-height: 86vh;
`;

export const Login = (props) => {
  const [loginError, setLoginError] = useState(null);

  const logIn = () => {
    setLoginError(null);

    if (props.username === "") {
      setLoginError("No username was entered.");
      return;
    }

    if (props.password === "") {
      setLoginError("No password was entered.");
      return;
    }

    axios
      .post("api/login/", {
        username: props.username,
        password: props.password,
      })
      .then((response) => {
        console.log("Successfully logged in: ", props.username);
        props.setToken(response.data.token);
      })
      .catch((error) => {
        console.log(error);
        setLoginError(
          "Oops!  Invalid credentials.  Try again.  If you can't remember your credentials or keep seeing this, contact support."
        );
        props.setUsername("");
        props.setPassword("");
      });
  };

  return (
    <>
      <MsgBanner msg={loginError} setMsg={(value) => setLoginError(value)} />
      <IntroLoginWrapper>
        <LoginIntro />
        <LoginBox
          username={props.username}
          setUsername={props.setUsername}
          password={props.password}
          setPassword={props.setPassword}
          logIn={logIn}
        />
      </IntroLoginWrapper>
    </>
  );
};

export default Login;
