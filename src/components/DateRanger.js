import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { InlineDescriptionLabel, DateInput } from "./SharedStyles";

const LocalWrapper = styled.div`
  width: 250px;
  height: 79px;
  margin: 10px;
`;

const DateRanger = ({ start, setStart, end, setEnd }) => (
  <LocalWrapper>
    <InlineDescriptionLabel>Start Date:</InlineDescriptionLabel>
    <DateInput value={start} onChange={(e) => setStart(e.target.value)} />
    <br />
    <br />
    <InlineDescriptionLabel>End Date:</InlineDescriptionLabel>
    <DateInput value={end} onChange={(e) => setEnd(e.target.value)} />
  </LocalWrapper>
);

DateRanger.propTypes = {
  start: PropTypes.string.isRequired,
  setStart: PropTypes.func.isRequired,
  end: PropTypes.string.isRequired,
  setEnd: PropTypes.func.isRequired,
};

export default DateRanger;
