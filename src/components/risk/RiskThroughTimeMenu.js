import React from "react";
import styled from "styled-components";
import DateRanger from "../DateRanger";
import RiskVTRadio from "./RiskVTRadio";
import GraphViewType from "../GraphViewType";
import RiskUnitRadio from "./RiskUnitRadio";
import RiskAggrRadio from "./RiskAggrRadio";
import RiskThroughTimeSelector from "./RiskThroughTimeSelector";

const LocalMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
`;

const RiskThroughTimeMenu = (props) => (
  <>
    <LocalMenuWrapper>
      <div>
        <DateRanger
          start={props.start}
          end={props.end}
          setStart={props.setStart}
          setEnd={props.setEnd}
        />
      </div>
      <div>
        <RiskVTRadio riskVT={props.riskVT} setRiskVT={props.setRiskVT} />
      </div>
      <div>
        <RiskUnitRadio
          unitType={props.unitType}
          setUnitType={props.setUnitType}
        />
        {props.unitType !== "portfolio" && (
          <>
            <RiskAggrRadio
              aggrType={props.aggrType}
              setAggrType={props.setAggrType}
            />
            <RiskThroughTimeSelector />
          </>
        )}
      </div>
      <div>
        <GraphViewType
          dropdownOptions={props.vTOptions}
          setGraphVT={props.setGraphVT}
        />
      </div>
    </LocalMenuWrapper>
    <hr />
  </>
);

export default RiskThroughTimeMenu;
