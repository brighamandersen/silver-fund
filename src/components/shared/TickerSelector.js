import React, { useState, useEffect } from "react";
import Select from "react-select";

import { CUSTOM_SELECT_THEME } from "../../utils/constants";
import styled from "styled-components";

const SelectorWrapper = styled.div`
  width: 270px;
`;

const TickerSelector = (props) => {
  const [tickerFilter, setTickerFilter] = useState([]);
  let tickerOptions = props.optionsData.map(({ ticker }) => ticker);
  tickerOptions = [...new Set(tickerOptions)];

  tickerOptions = tickerOptions.map((item) => ({
    value: item,
    label: item,
  }));

  const filterAllData = () => {
    if (!tickerFilter) {
      props.onSubmit(props.optionsData);
      return props.optionsData;
    }
    const tickers = tickerFilter.map(({ value }) => value);
    let newData = [];
    for (let i = 0; i < tickers.length; ++i) {
      const filterData = props.optionsData.filter(
        (item) => item.ticker === tickers[i]
      );
      newData.push.apply(newData, filterData);
    }

    if (newData.length !== 0) {
      props.onSubmit(newData);
      return newData;
    } else {
      props.onSubmit(props.optionsData);
      return props.optionsData;
    }
  };

  useEffect(() => {
    filterAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickerFilter]);

  return (
    <SelectorWrapper>
      {props.optionsData && props.optionsData.length > 0 ? (
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

export default TickerSelector;
