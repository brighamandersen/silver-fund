import React from "react";
import styled from "styled-components";
import { getDateStr } from "../../utils/helpers";
import { InlineDescriptionLabel, DateInput } from "./SharedStyles";

const LocalWrapper = styled.div`
  width: 250px;
  height: 79px;
  margin: 10px;
`;

export const DateRanger = (props) => (
  <LocalWrapper>
    <InlineDescriptionLabel>Start Date:</InlineDescriptionLabel>
    <DateInput
      value={props.start}
      max={getDateStr(0)}
      onChange={(e) => props.setStart(e.target.value)}
    />
    <br />
    <br />
    <InlineDescriptionLabel>End Date:</InlineDescriptionLabel>
    <DateInput
      value={props.end}
      max={getDateStr(0)}
      onChange={(e) => props.setEnd(e.target.value)}
    />
  </LocalWrapper>
);

export default DateRanger;
