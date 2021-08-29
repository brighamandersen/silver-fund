import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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

DateSingler.propTypes = {
  date: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
};

export default DateSingler;
