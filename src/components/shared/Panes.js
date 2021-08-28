import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Trades from "../trades/Trades";
import Home from "../home/Home";
import Risk from "../risk/Risk";
import Positions from "../positions/Positions";
import Construction from "../construction/Construction";

const Panes = (props) => (
  <Tabs className="pane" defaultActiveKey="home" transition={false}>
    <Tab eventKey="home" title="Home">
      <Home username={props.username} password={props.password} />
    </Tab>
    <Tab eventKey="positions" title="Positions">
      <Positions />
    </Tab>
    <Tab eventKey="trades" title="Trade History">
      <Trades />
    </Tab>
    <Tab eventKey="construction" title="Portfolio Construction">
      <Construction username={props.username} />
    </Tab>
    <Tab eventKey="risk" title="Risk Analytics">
      <Risk />
    </Tab>
  </Tabs>
);

export default Panes;
