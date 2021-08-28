import React from "react";
import sfLogo from "../../media/sf-logo-white.png";
import PasswordChanger from "./PasswordChanger";
import { Content, LeftCol } from "../shared/SharedStyles";
import { useAuth } from "../../utils/AuthContext";
import styled from "styled-components";

const SfLogo = styled.img`
  height: 500px;
  margin-left: 80px;
  margin-top: 40px;

  @media (max-width: 1260px) {
    display: none;
  }
`;

const Home = () => {
  const { username } = useAuth();

  return (
    <Content>
      <LeftCol>
        <h3>{username}, Welcome to the Silver Fund Web App!</h3>
        <a
          className="btn m-4"
          href="https://byu.sharepoint.com/sites/silverfund-wiki"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
        <a
          className="btn black-btn m-4"
          href="mailto:silverfund@byu.edu?subject=Question about Web App" // FIXME - Add valid email address
        >
          Contact Us
        </a>
        <PasswordChanger />
      </LeftCol>
      <SfLogo src={sfLogo} className="home-logo" alt="Silver Fund Logo" />
    </Content>
  );
};

export default Home;
