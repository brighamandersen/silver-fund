import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import styled from "styled-components";
import { CUSTOM_SELECT_THEME } from "../utils/constants";

const SelectorWrapper = styled.div`
  width: 270px;
`;

const TickerSelector = ({ optionsData, onSubmit }) => {
  const [tickerFilter, setTickerFilter] = useState([]);
  let tickerOptions = optionsData.map(({ ticker }) => ticker);
  tickerOptions = [...new Set(tickerOptions)];

  tickerOptions = tickerOptions.map((item) => ({
    value: item,
    label: item,
  }));

  const filterAllData = () => {
    if (!tickerFilter) {
      onSubmit(optionsData);
      return optionsData;
    }
    const tickers = tickerFilter.map(({ value }) => value);
    let newData = [];
    for (let i = 0; i < tickers.length; ++i) {
      const filterData = optionsData.filter(
        (item) => item.ticker === tickers[i]
      );
      newData.push.apply(newData, filterData);
    }

    if (newData.length !== 0) {
      onSubmit(newData);
      return newData;
    } else {
      onSubmit(optionsData);
      return optionsData;
    }
  };

  useEffect(() => {
    filterAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickerFilter]);

  return (
    <SelectorWrapper>
      {optionsData && optionsData.length > 0 ? (
        <Select
          theme={CUSTOM_SELECT_THEME}
          options={tickerOptions}
          noOptionsMessage={() => "All tickers have been selected."}
          placeholder="Filter by Ticker"
          onChange={setTickerFilter}
          isMulti
          isSearchable
        />
      ) : (
        <Select isDisabled placeholder="Select date(s) first." />
      )}
    </SelectorWrapper>
  );
};

TickerSelector.propTypes = {
  optionsData: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TickerSelector;
