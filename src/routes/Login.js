import React, { useRef } from "react";
import styled from "styled-components";
import { Content } from "../components/shared/SharedStyles";
import sfLogo from "../media/sf-logo-white.png";
import usernameIcon from "../media/user.png";
import passwordIcon from "../media/lock.png";
import { useAuth } from "../utils/AuthContext";
import { COLORS, CORNER_ROUNDING } from "../utils/constants";
import { useBanner } from "../utils/BannerContext";
import { useHistory } from "react-router";

const Wrapper = styled(Content)`
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: space-evenly;
  min-height: 86vh;
`;

const AboutWrapper = styled.div`
  text-align: center;
  max-width: 650px;
  margin: 2rem;

  p {
    padding: 20px;
    font-size: 20px;
    color: ${COLORS.black};
  }
`;

const LoginSection = styled.div`
  border-radius: ${CORNER_ROUNDING};

  h3 {
    color: ${COLORS.black};
    text-align: center;
  }
`;

const LoginNotifier = styled.p`
  color: ${COLORS.successGreen};
`;

const AboutSection = () => (
  <AboutWrapper>
    <img src={sfLogo} alt="Chart Icon" className="w-50 py-3" />
    <h1>Silver Fund Web App</h1>
    <p>
      An institutional-quality web app created for use by Silver Fund, The
      Marriott Business School's student-run investment fund. This app aims to
      support investment research, trading, risk management, and portfolio
      analysis.
    </p>
    <a
      className="btn px-4"
      href="https://silverfund.byu.edu/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn More
    </a>
  </AboutWrapper>
);

export const Login = () => {
  const { logIn } = useAuth();
  const { emitErrorMsg, clearMsg } = useBanner();
  const history = useHistory();

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
    history.push("/");

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <Wrapper>
      <AboutSection />
      <LoginSection className="card p-4 m-5">
        <h3>Welcome Back!</h3>
        <LoginNotifier>Enter anything for username and password</LoginNotifier>
        <form>
          {/* Username */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <img
                className="input-group-text"
                src={usernameIcon}
                alt="Username Icon"
                style={{ width: "50px" }}
              />
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              ref={usernameRef}
              autoFocus
            />
          </div>
          {/* Password */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <img
                className="input-group-text"
                src={passwordIcon}
                alt="Password Icon"
                style={{ width: "50px" }}
              />
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              ref={passwordRef}
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
      </LoginSection>
    </Wrapper>
  );
};

export default Login;
