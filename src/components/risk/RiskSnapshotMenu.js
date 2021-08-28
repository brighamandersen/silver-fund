import React from "react";
import styled from "styled-components";
import DateSingler from "../DateSingler";
import RiskVTRadio from "./RiskVTRadio";
import GraphViewType from "../GraphViewType";
import { RISK_SNAPSHOT_GVT_OPTIONS } from "../../utils/constants";

const LocalMenu = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const WideDiv = styled.div`
  flex: 3;
`;

const NarrowDiv = styled.div`
  flex: 1;
`;

const RiskSnapshotMenu = (props) => (
  <>
    <LocalMenu>
      <WideDiv>
        <DateSingler date={props.date} setDate={props.setDate} />
      </WideDiv>
      <NarrowDiv />
      <NarrowDiv>
        <RiskVTRadio riskVT={props.riskVT} setRiskVT={props.setRiskVT} />
      </NarrowDiv>
      <NarrowDiv>
        <GraphViewType
          dropdownOptions={RISK_SNAPSHOT_GVT_OPTIONS}
          setGraphVT={props.setGraphVT}
        />
      </NarrowDiv>
    </LocalMenu>
    <hr />
  </>
);

export default RiskSnapshotMenu;
