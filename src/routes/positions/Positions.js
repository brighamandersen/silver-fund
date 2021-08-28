import React from "react";
import PositionsSnapshot from "./PositionsSnapshot";
import PositionsHistory from "./PositionsHistory";
import { PositionsSubNavbar } from "../../components/shared/nav/SubNavbars";
import { Redirect, Route } from "react-router";
import NotFound from "../NotFound";

const Positions = () => (
  <>
    <PositionsSubNavbar />
    <Route exact path="/positions/snapshot" component={PositionsSnapshot} />
    <Route exact path="/positions/history" component={PositionsHistory} />
    {/* Default Active */}
    <Route exact path="/positions">
      <Redirect to="/positions/snapshot" />
    </Route>
    <Route path="*" component={NotFound} />
  </>
);

export default Positions;
