import React from "react";
import { Route, Redirect } from "react-router-dom";

import RiskSnapshot from "./RiskSnapshot";
import RiskThroughTime from "./RiskThroughTime";
import RiskWhatIf from "./RiskWhatIf";
import { RiskSubNavbar } from "../../components/shared/nav/SubNavbars";
import NotFound from "../NotFound";

export const Risk = () => (
  <>
    <RiskSubNavbar />
    <Route exact path="/risk/snapshot" component={RiskSnapshot} />
    <Route exact path="/risk/throughtime" component={RiskThroughTime} />
    <Route exact path="/risk/whatif" component={RiskWhatIf} />
    {/* Default Active */}
    <Route exact path="/risk">
      <Redirect to="/risk/snapshot" />
    </Route>
    <Route path="*" component={NotFound} />
  </>
);

export default Risk;
