import React from "react";
import styled from "styled-components";
import { useAuth } from "../../../utils/AuthContext";
import NavTab from "./NavTab";

export const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Navbar = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn && (
        <Bar>
          <NavTab exact to="/">
            Home
          </NavTab>
          <NavTab to="/positions">Positions</NavTab>
          <NavTab to="/trades">Trade History</NavTab>
          <NavTab to="/construction">Portfolio Construction</NavTab>
          <NavTab to="/risk">Risk Analytics</NavTab>
        </Bar>
      )}
    </>
  );
};

export default Navbar;
