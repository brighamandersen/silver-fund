import React, { useRef } from "react";
import styled from "styled-components";
import { Content } from "../shared/SharedStyles";
import About from "./About";
import usernameIcon from "../../media/user.png";
import passwordIcon from "../../media/lock.png";
import { useAuth } from "../../utils/AuthContext";
import { COLORS } from "../../utils/constants";
import { useBanner } from "../../utils/BannerContext";

const IntroLoginWrapper = styled(Content)`
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: space-evenly;
  min-height: 86vh;
`;

const LoginNotifier = styled.p`
  color: ${COLORS.successGreen};
`;

export const Login = () => {
  const { logIn } = useAuth();
  const { emitErrorMsg, clearMsg } = useBanner();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const submitLogin = () => {
    clearMsg();

    if (usernameRef.current.value === "") {
      emitErrorMsg("No username was entered.");
      return;
    }

    if (passwordRef.current.value === "") {
      emitErrorMsg("No password was entered.");
      return;
    }

    logIn(usernameRef.current.value);

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <IntroLoginWrapper>
      <About />
      <div className="card login-box p-4 m-5">
        <h3 className="card-title">Welcome Back!</h3>
        <LoginNotifier>Enter anything for username and password</LoginNotifier>
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
  );
};

export default Login;
