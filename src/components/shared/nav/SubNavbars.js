import React from "react";
import styled from "styled-components";
import { COLORS } from "../../../utils/constants";

import { Bar, Tab, activeStyle } from "./NavComponents";

const SubBar = styled(Bar)`
  background-color: ${COLORS.fade1};
  border-top: 2px solid ${COLORS.navy};
`;

export const PositionsSubNavbar = () => (
  <SubBar>
    <Tab to="/positions/snapshot" activeStyle={activeStyle}>
      Snapshot (Bar Chart View)
    </Tab>
    <Tab to="/positions/history" activeStyle={activeStyle}>
      History by Stock (Time Series View)
    </Tab>
  </SubBar>
);

export const RiskSubNavbar = () => (
  <SubBar>
    <Tab to="/risk/snapshot" activeStyle={activeStyle}>
      Portfolio Snapshot
    </Tab>
    <Tab to="/risk/throughtime" activeStyle={activeStyle}>
      Portfolio Risk Through Time
    </Tab>
    <Tab to="/risk/whatif" activeStyle={activeStyle}>
      What-If Analysis
    </Tab>
  </SubBar>
);
