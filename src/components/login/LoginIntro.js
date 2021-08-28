import "./Login.css";
import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/constants";
import sfLogo from "../../media/sf-logo-white.png";

const H1 = styled.h1`
  color: ${COLORS.navy};
`;

const LoginIntro = () => (
  <div className="sf-intro m-4">
    <img src={sfLogo} alt="" className="trading-img w-50 py-3" />
    <H1>Silver Fund Web App</H1>
    <p className="intro-info">
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
  </div>
);

export default LoginIntro;
