import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Content } from "../shared/SharedStyles";
import MsgBanner from "../shared/MsgBanner";
import LoginIntro from "./LoginIntro";
import usernameIcon from "../../media/user.png";
import passwordIcon from "../../media/lock.png";
import { useAuth } from "../../utils/AuthContext";

const IntroLoginWrapper = styled(Content)`
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: space-evenly;
  min-height: 86vh;
`;

export const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const usernameRef = useRef();
  const passwordRef = useRef();
  // const [password, setPassword] = useState("");

  const { logIn } = useAuth();

  const submitLogin = () => {
    setLoginError(null);

    if (usernameRef.current.value === "") {
      setLoginError("No username was entered.");
      return;
    }

    if (passwordRef.current.value === "") {
      setLoginError("No password was entered.");
      return;
    }

    console.log("init uname", usernameRef);
    logIn(usernameRef.current.value);
    // setUsername("");
    // setPassword("");
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  console.log("username", usernameRef.current?.value);

  return (
    <>
      <MsgBanner msg={loginError} setMsg={(value) => setLoginError(value)} />
      <IntroLoginWrapper>
        <LoginIntro />
        <div className="card login-box p-4 m-5">
          <h3 className="card-title">Welcome Back!</h3>
          <p style={{ color: "green" }}>
            Enter anything for username and password
          </p>
          <form>
            {/* Username */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <img
                  className="input-group-text"
                  src={usernameIcon}
                  alt=""
                  style={{ width: "50px" }}
                />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                ref={usernameRef}
                // onChange={(e) => props.setUsername(e.target.value)}
              />
            </div>
            {/* Password */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <img
                  className="input-group-text"
                  src={passwordIcon}
                  alt=""
                  style={{ width: "50px" }}
                />
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                ref={passwordRef}
                // onChange={(e) => props.setPassword(e.target.value)}
              />
            </div>
            {/* Sign In */}
            <button
              type="button"
              className="btn blue-btn w-100"
              onClick={submitLogin}
            >
              Log In
            </button>
            <h5 className="pt-4">Need an account?</h5>
            <p>Or simply can't log in?</p>
            <a
              className="btn black-btn w-100"
              href="mailto:silverfundsupport@byu.edu"
            >
              Contact Us
            </a>
          </form>
        </div>
      </IntroLoginWrapper>
    </>
  );
};

export default Login;
