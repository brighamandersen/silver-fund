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
  const [errorMsg, setErrorMsg] = useState(null);
  const [start, setStart] = useState(DEFAULT_START_DATE);
  const [end, setEnd] = useState(DEFAULT_END_DATE);
  const [selectedTrades, setSelectedTrades] = useState([]);
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

    // axios
    //   .get("api/trades/filter/date/", {
    //     params: {
    //       start: start + "@00:00:00",
    //       end: end + "@23:59:59",
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Trades from " + start + " to " + end, response.data);
    //     if (response.data.length === 0) {
    //       setShowTable(false);
    //       setErrorMsg(
    //         "No trades exist on the date(s) selected.  Try a different selection."
    //       );
    //     }
    //     setTrades(response.data);
    //     setSelectedTrades(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setShowTable(false);
    //     setErrorMsg(
    //       "Uh oh! Something went wrong on our end (failed to load trades data).  If this error persists, contact support."
    //     );
    //   });
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
          optionsData={trades}
          onSubmit={(newValue) => setSelectedTrades(newValue)}
        />
      </div>
      <hr />
      {showTable && (
        <SortableTable
          tableData={selectedTrades}
          tableColumns={TRADES_TABLE_COLS}
          initialSort="time"
        />
      )}
    </Content>
  );
};

export default Trades;
