import React from "react";
import styled from "styled-components";
import { getDateStr } from "../../utils/helpers";
import { InlineDescriptionLabel, DateInput } from "./SharedStyles";

const LocalWrapper = styled.div`
  width: 198px;
  margin: 10px;
`;

export const DateSingler = (props) => (
  <LocalWrapper>
    <InlineDescriptionLabel>Date:</InlineDescriptionLabel>
    <DateInput
      value={props.date}
      max={getDateStr(0)}
      onChange={(e) => props.setDate(e.target.value)}
    />
  </LocalWrapper>
);

export default DateSingler;
