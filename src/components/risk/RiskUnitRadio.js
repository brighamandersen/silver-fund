import React from "react";
import styled from "styled-components";
import {
  DescriptionLabel,
  RadioOptionLabel,
  RadioInput,
} from "../shared/SharedStyles";

export const UnitTypeWrapper = styled.div`
  width: 365px;
  margin: 10px;
`;

const RiskUnitRadio = (props) => (
  <UnitTypeWrapper>
    <DescriptionLabel>Analytical Unit Type:</DescriptionLabel>
    <RadioOptionLabel>
      <RadioInput
        value="portfolio"
        checked={props.unitType === "portfolio"}
        onChange={(e) => props.setUnitType(e.target.value)}
      />
      Portfolio
    </RadioOptionLabel>
    <RadioOptionLabel>
      <RadioInput
        value="industry"
        checked={props.unitType === "industry"}
        onChange={(e) => props.setUnitType(e.target.value)}
      />
      Industry
    </RadioOptionLabel>
    <RadioOptionLabel>
      <RadioInput
        value="factor"
        checked={props.unitType === "factor"}
        onChange={(e) => props.setUnitType(e.target.value)}
      />
      Factor
    </RadioOptionLabel>
    <RadioOptionLabel>
      <RadioInput
        value="stock"
        checked={props.unitType === "stock"}
        onChange={(e) => props.setUnitType(e.target.value)}
      />
      Stock
    </RadioOptionLabel>
  </UnitTypeWrapper>
);

export default RiskUnitRadio;
