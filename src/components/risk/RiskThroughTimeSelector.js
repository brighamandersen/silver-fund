import React from "react";
import styled from "styled-components";
import Select from "react-select";
import { CUSTOM_SELECT_THEME } from "../../utils/constants";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const LocalWrapper = styled.div`
  width: 315px;
  margin: 10px;
`;

const RiskThroughTimeSelector = () => (
  <LocalWrapper>
    <Select
      theme={CUSTOM_SELECT_THEME}
      options={options}
      placeholder="Search: Industries, Factors, or Stocks"
      isMulti
      isSearchable
    />
  </LocalWrapper>
);

export default RiskThroughTimeSelector;
