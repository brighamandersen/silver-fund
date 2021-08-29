import React from "react";
import styled from "styled-components";
import byuLogoText from "../assets/byu-logo-text.png";
import { useAuth } from "../utils/AuthContext";

const Wrapper = styled.div`
  max-width: 60em;
`;

const ByuLogo = styled.img`
  height: 29px;
  padding-bottom: 6px;
  padding-right: 8px;
`;

const Header = () => {
  const { loggedIn, logOut } = useAuth();

  return (
    <Wrapper className="d-flex w-100 p-2 pt-3 mx-auto flex-column">
      <header>
        <h3 className="float-left">
          <ByuLogo src={byuLogoText} alt="Silver Fund Logo" />
          Silver Fund
        </h3>
        <nav className="nav float-right">
          {loggedIn && (
            <button
              type="button"
              className="btn white-btn py-1"
              onClick={logOut}
            >
              Log Out
            </button>
          )}
        </nav>
      </header>
    </Wrapper>
  );
};

export default Header;
