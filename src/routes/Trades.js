import React, { useState, useEffect } from "react";

import { TRADES_TABLE_COLS } from "../utils/constants";
import { getDateStr } from "../utils/helpers";
// // import MsgBanner from "../components/shared/MsgBanner";
import DateRanger from "../components/shared/DateRanger";
import TickerSelector from "../components/shared/TickerSelector";
import SortableTable from "../components/shared/SortableTable";
import { Content } from "../components/shared/SharedStyles";

export const Trades = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [start, setStart] = useState("2020-01-01");
  const [end, setEnd] = useState(getDateStr(-1));
  const [apiTrades, setApiTrades] = useState([]);
  const [selectedTrades, setSelectedTrades] = useState([]);
  const [showTable, setShowTable] = useState(false);

  /* Get api data for trades in a date range */
  useEffect(() => {
    setShowTable(true);
    setApiTrades([]);
    setErrorMsg(null);

    if (end < start) {
      setShowTable(false);
      setErrorMsg("Warning: Start date isn't before end date.");
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
    //     setApiTrades(response.data);
    //     setSelectedTrades(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setShowTable(false);
    //     setErrorMsg(
    //       "Uh oh! Something went wrong on our end (failed to load trades data).  If this error persists, contact support."
    //     );
    //   });
  }, [start, end]); // Calls the API to fetch data at first, and whenever start or end date change.

  return (
    <>
      {/* <MsgBanner msg={errorMsg} setMsg={(value) => setErrorMsg(value)} /> */}
      <Content>
        <div className="d-inline-block">
          <DateRanger
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
          />
        </div>
        <div className="ticker-selector d-inline-block ml-4">
          <TickerSelector
            optionsData={apiTrades}
            onSubmit={(newValue) => setSelectedTrades(newValue)}
          />
        </div>
        <hr />
        {showTable && (
          <SortableTable
            tableData={selectedTrades}
            tableColumns={TRADES_TABLE_COLS}
            initialSort="trade_time"
          />
        )}
      </Content>
    </>
  );
};

export default Trades;
