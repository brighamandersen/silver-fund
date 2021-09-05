import React, { useState, useEffect } from "react";

import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  TRADES_TABLE_COLS,
} from "../utils/constants";
import DateRanger from "../components/DateRanger";
import TickerSelector from "../components/TickerSelector";
import SortableTable from "../components/SortableTable";
import { Content } from "../components/SharedStyles";
import { TRADES } from "../assets/trades";
import { useBanner } from "../utils/BannerContext";

const Trades = () => {
  const [trades, setTrades] = useState(TRADES);
  const [start, setStart] = useState(DEFAULT_START_DATE);
  const [end, setEnd] = useState(DEFAULT_END_DATE);
  const [showTable, setShowTable] = useState(false);

  const { emitErrorMsg, clearMsg } = useBanner();

  useEffect(() => {
    setShowTable(true);
    setTrades([]);
    clearMsg();

    if (end < start) {
      setShowTable(false);
      emitErrorMsg("Warning: Start date isn't before end date.");
      return;
    }

    const filteredTrades = TRADES.filter(
      (t) => t.tradeTime >= start && t.tradeTime <= end + 1
    );

    if (filteredTrades.length === 0) {
      setShowTable(false);
      emitErrorMsg(
        "No trades exist on the date(s) selected.  Try a different selection."
      );
      return;
    }

    setTrades(filteredTrades);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end]);

  return (
    <Content>
      <div className="d-inline-block">
        <DateRanger
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
        />
      </div>
      <div className="d-inline-block ml-4">
        <TickerSelector
          optionsData={TRADES}
          onSubmit={(newValue) => setTrades(newValue)}
        />
      </div>
      <hr />
      {showTable && (
        <SortableTable
          tableData={trades}
          tableColumns={TRADES_TABLE_COLS}
          initialSort="tradeTime"
        />
      )}
    </Content>
  );
};

export default Trades;
