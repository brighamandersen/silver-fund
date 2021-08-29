import React from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { COLORS } from "../../utils/constants";
import { Bar } from "./Navbar";
import NavTab from "./NavTab";

const SubBar = styled(Bar)`
  background-color: ${COLORS.fade1};
  border-top: 2px solid ${COLORS.navy};
`;

const PositionsSubNavbar = () => (
  <SubBar>
    <NavTab to="/positions/snapshot">Snapshot (Bar Chart View)</NavTab>
    <NavTab to="/positions/history">History by Stock (Time Series View)</NavTab>
  </SubBar>
);

const RiskSubNavbar = () => (
  <SubBar>
    <NavTab to="/risk/snapshot">Portfolio Snapshot</NavTab>
    <NavTab to="/risk/through-time">Portfolio Risk Through Time</NavTab>
    <NavTab to="/risk/what-if">What-If Analysis</NavTab>
  </SubBar>
);

const SubNavbar = (props) => {
  const url = useLocation().pathname;

  const showPositionsSubNavbar = url.includes("/positions");
  const showRiskSubNavbar = url.includes("/risk");

  return (
    <>
      {showPositionsSubNavbar && <PositionsSubNavbar />}
      {showRiskSubNavbar && <RiskSubNavbar />}
    </>
  );
};

export default SubNavbar;
