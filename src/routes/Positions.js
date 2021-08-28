import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PositionsSnapshot from "../components/positions/PositionsSnapshot";
import PositionsHistory from "../components/positions/PositionsHistory";

export const Positions = () => (
  <Tabs className="sub-pane" defaultActiveKey="snapshot" transition={false}>
    <Tab eventKey="snapshot" title="Snapshot (Bar Chart View)">
      <PositionsSnapshot />
    </Tab>
    <Tab eventKey="history" title="History by Stock (Time Series View)">
      <PositionsHistory />
    </Tab>
  </Tabs>
);

export default Positions;
