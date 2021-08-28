import React from "react";
import { useAuth } from "../../../utils/AuthContext";
import { Bar, Tab, activeStyle } from "./NavComponents";

const Navbar = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn && (
        <Bar>
          <Tab exact to="/" activeStyle={activeStyle}>
            Home
          </Tab>
          <Tab to="/positions" activeStyle={activeStyle}>
            Positions
          </Tab>
          <Tab to="/trades" activeStyle={activeStyle}>
            Trade History
          </Tab>
          <Tab to="/construction" activeStyle={activeStyle}>
            Portfolio Construction
          </Tab>
          <Tab to="/risk" activeStyle={activeStyle}>
            Risk Analytics
          </Tab>
        </Bar>
      )}
    </>
  );
};

export default Navbar;
