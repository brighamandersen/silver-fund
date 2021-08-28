import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import RiskSnapshot from "../components/risk/RiskSnapshot";
import RiskThroughTime from "../components/risk/RiskThroughTime";
import RiskWhatIf from "../components/risk/RiskWhatIf";

const Risk = () => (
  <Tabs className="sub-pane" defaultActiveKey="snapshot" transition={false}>
    <Tab eventKey="snapshot" title="Portfolio Snapshot">
      <RiskSnapshot />
    </Tab>
    <Tab eventKey="throughtime" title="Portfolio Risk Through Time">
      <RiskThroughTime />
    </Tab>
    <Tab eventKey="whatif" title="What-If Analysis">
      <RiskWhatIf />
    </Tab>
  </Tabs>
);

export default Risk;
