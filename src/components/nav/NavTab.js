import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { COLORS, CORNER_ROUNDING } from "../../utils/constants";

const activeStyle = {
  color: COLORS.navy,
  backgroundColor: COLORS.white,
  borderTopLeftRadius: CORNER_ROUNDING,
  borderTopRightRadius: CORNER_ROUNDING,
};

const Tab = styled(NavLink)`
  font-size: large;
  text-decoration: none;
  color: ${COLORS.fade2};
  padding: 10px 15px;
  display: flex;
  align-items: center;
  letter-spacing: 0.3px;

  &:hover {
    background-color: ${COLORS.fade1};
    border-top-left-radius: ${CORNER_ROUNDING};
    border-top-right-radius: ${CORNER_ROUNDING};
    text-decoration: none;
    color: ${COLORS.white};
  }
`;

const NavTab = ({ exact, to, children }) => {
  return (
    <Tab exact={exact} to={to} activeStyle={activeStyle}>
      {children}
    </Tab>
  );
};

export default NavTab;
