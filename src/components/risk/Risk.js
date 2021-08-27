import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import RiskSnapshot from "./RiskSnapshot";
import RiskThroughTime from "./RiskThroughTime";
import RiskWhatIf from "./RiskWhatIf";

const Risk = () => (
  <Tabs
    className="sub-pane"
    defaultActiveKey="snapshot"
    transition={false}
  >
    <Tab eventKey="snapshot" title="Portfolio Snapshot">
      <RiskSnapshot />
    </Tab>
    <Tab
      eventKey="throughtime"
      title="Portfolio Risk Through Time"
    >
      <RiskThroughTime />
    </Tab>
    <Tab
      eventKey="whatif"
      title="What-If Analysis"
    >
      <RiskWhatIf />
    </Tab>
  </Tabs>
);

export default Risk;
