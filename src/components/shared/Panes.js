import React from "react";
import { useAuth } from "../../utils/AuthContext";
import { PaneBar, Tab, activeStyle } from "./NavComponents";

const Panes = () => {
  const { loggedIn } = useAuth();

  return (
    <>
      {loggedIn && (
        <PaneBar>
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
        </PaneBar>
      )}
    </>
  );
};

export default Panes;
