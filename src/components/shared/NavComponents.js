import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { COLORS } from "../../utils/constants";

export const activeStyle = {
  color: COLORS.navy,
  backgroundColor: COLORS.white,
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
};

export const PaneBar = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SubpaneBar = styled(PaneBar)`
  background-color: ${COLORS.fade1};
  border-top: 2px solid ${COLORS.navy};
`;

export const NavTab = styled(NavLink)`
  font-size: large;
  text-decoration: none;
  color: ${COLORS.fade2};
  padding: 10px 15px;
  display: flex;
  align-items: center;
  letter-spacing: 0.3px;

  &:hover {
    background-color: ${COLORS.fade1};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    text-decoration: none;
    color: ${COLORS.white};
  }
`;

export const Tab = (props) => {
  return (
    <NavTab exact={props.exact} to={props.to} activeStyle={props.activeStyle}>
      {props.children}
    </NavTab>
  );
};
