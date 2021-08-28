import React from "react";
import styled from "styled-components";
import {
  DescriptionLabel,
  RadioOptionLabel,
  RadioInput,
} from "../SharedStyles";

const LocalWrapper = styled.div`
  width: 160px;
  margin: 10px;
`;

const RiskVTRadio = (props) => (
  <LocalWrapper>
    <DescriptionLabel>Risk View Type:</DescriptionLabel>
    <RadioOptionLabel>
      <RadioInput
        value="total"
        checked={props.riskVT === "total"}
        onChange={(e) => props.setRiskVT(e.target.value)}
      />
      Total
    </RadioOptionLabel>
    <RadioOptionLabel>
      <RadioInput
        value="active"
        checked={props.riskVT === "active"}
        onChange={(e) => props.setRiskVT(e.target.value)}
      />
      Active
    </RadioOptionLabel>
  </LocalWrapper>
);

export default RiskVTRadio;
