import React from "react";
import styled from "styled-components";
import { getDateStr } from "../utils/helpers";
import { InlineDescriptionLabel, DateInput } from "./SharedStyles";

const Wrapper = styled.div`
  width: 198px;
  margin: 10px;
`;

const DateSingler = (props) => (
  <Wrapper>
    <InlineDescriptionLabel>Date:</InlineDescriptionLabel>
    <DateInput
      value={props.date}
      max={getDateStr(0)}
      onChange={(e) => props.setDate(e.target.value)}
    />
  </Wrapper>
);

export default DateSingler;
