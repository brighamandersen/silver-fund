import React, { useState } from "react";

// import MsgBanner from "../shared/MsgBanner";
import {
  Content,
  TwoColWrapper,
  RightCol,
  LeftCol,
} from "../shared/SharedStyles";
import RiskVTRadio from "./RiskVTRadio";
import RiskWhatIfStocksTable from "./RiskWhatIfStocksTable";
import RiskWhatIfStatsTable from "./RiskWhatIfStatsTable";

export const RiskWhatIfAnalysis = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [riskVT, setRiskVT] = useState("total");

  return (
    <>
      {/* <MsgBanner msg={errorMsg} setMsg={(value) => setErrorMsg(value)} /> */}
      <Content>
        <TwoColWrapper>
          <LeftCol>
            <RiskVTRadio riskVT={riskVT} setRiskVT={setRiskVT} />
            <br />
            <br />
            <RiskWhatIfStocksTable
              setErrorMsg={(value) => setErrorMsg(value)}
            />
            <br />
            <br />
          </LeftCol>
          <RightCol>
            <RiskWhatIfStatsTable />
          </RightCol>
        </TwoColWrapper>
      </Content>
    </>
  );
};

export default RiskWhatIfAnalysis;
