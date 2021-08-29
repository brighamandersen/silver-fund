import React from "react";
import styled from "styled-components";
import { InlineDescriptionLabel, DateInput } from "./SharedStyles";

const Wrapper = styled.div`
  width: 200px;
  margin: 10px;
`;

const DateSingler = ({ date, setDate }) => (
  <Wrapper>
    <InlineDescriptionLabel>Date:</InlineDescriptionLabel>
    <DateInput value={date} onChange={(e) => setDate(e.target.value)} />
  </Wrapper>
);

export default DateSingler;
