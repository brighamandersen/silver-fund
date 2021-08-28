import React from "react";
import styled from "styled-components";
import { COLORS } from "../../../utils/constants";
import { Bar } from "./Navbar";
import { NavTab } from "./NavTab";

const SubBar = styled(Bar)`
  background-color: ${COLORS.fade1};
  border-top: 2px solid ${COLORS.navy};
`;

export const PositionsSubNavbar = () => (
  <SubBar>
    <NavTab to="/positions/snapshot">Snapshot (Bar Chart View)</NavTab>
    <NavTab to="/positions/history">History by Stock (Time Series View)</NavTab>
  </SubBar>
);

export const RiskSubNavbar = () => (
  <SubBar>
    <NavTab to="/risk/snapshot">Portfolio Snapshot</NavTab>
    <NavTab to="/risk/throughtime">Portfolio Risk Through Time</NavTab>
    <NavTab to="/risk/whatif">What-If Analysis</NavTab>
  </SubBar>
);
