import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { COLORS, CORNER_ROUNDING } from "../../../utils/constants";

export const activeStyle = {
  color: COLORS.navy,
  backgroundColor: COLORS.white,
  borderTopLeftRadius: CORNER_ROUNDING,
  borderTopRightRadius: CORNER_ROUNDING,
};

export const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SubpaneBar = styled(Bar)`
  background-color: ${COLORS.fade1};
  border-top: 2px solid ${COLORS.navy};
`;

const PaneTab = styled(NavLink)`
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

export const Tab = (props) => {
  return (
    <PaneTab exact={props.exact} to={props.to} activeStyle={props.activeStyle}>
      {props.children}
    </PaneTab>
  );
};
