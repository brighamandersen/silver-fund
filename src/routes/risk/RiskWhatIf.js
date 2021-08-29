import React, { useState } from "react";

import {
  Content,
  TwoColWrapper,
  RightCol,
  LeftCol,
} from "../../components/SharedStyles";
import RiskVTRadio from "../../components/risk/RiskVTRadio";
import RiskWhatIfStocksTable from "../../components/risk/RiskWhatIfStocksTable";
import RiskWhatIfStatsTable from "../../components/risk/RiskWhatIfStatsTable";

const RiskWhatIf = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [riskVT, setRiskVT] = useState("total");

  return (
    <Content>
      <TwoColWrapper>
        <LeftCol>
          <RiskVTRadio riskVT={riskVT} setRiskVT={setRiskVT} />
          <br />
          <br />
          <RiskWhatIfStocksTable setErrorMsg={(value) => setErrorMsg(value)} />
          <br />
          <br />
        </LeftCol>
        <RightCol>
          <RiskWhatIfStatsTable />
        </RightCol>
      </TwoColWrapper>
    </Content>
  );
};

export default RiskWhatIf;
