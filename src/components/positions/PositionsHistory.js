import React, { useState, useEffect } from "react";
import axios from "axios";

import { POSITIONS_TABLE_COLS } from "../../utils/constants";
import {
  getDateStr,
  getDateStr3MonthsBack,
  formatTimeSeries,
} from "../../utils/helpers";
import MsgBanner from "../shared/MsgBanner";
import PositionsHistoryMenu from "./PositionsHistoryMenu";
import PositionsTimeSeries from "./PositionsTimeSeries";
import SortableTable from "../shared/SortableTable";
import { Content } from "../shared/SharedStyles";

export const PositionsHistory = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [apiPositions, setApiPositions] = useState([]);
  const [start, setStart] = useState(getDateStr3MonthsBack());
  const [end, setEnd] = useState(getDateStr(-1));
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [graphVT, setGraphVT] = useState(0);
  const [showGraphics, setShowGraphics] = useState(false);

  /* Get api data for positions in a date range*/
  useEffect(() => {
    setShowGraphics(true);
    setApiPositions([]);
    setErrorMsg(null);

    if (end < start) {
      setShowGraphics(false);
      setErrorMsg("Warning: Start date isn't before end date.");
      return;
    }

    // axios
    //   .get("api/positions/filter/date/", {
    //     params: {
    //       start: start,
    //       end: end,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Positions from " + start + " to " + end, response.data);
    //     if (response.data.length === 0) {
    //       setShowGraphics(false);
    //       setErrorMsg(
    //         "No positions exist on the date range selected.  Try a different selection."
    //       );
    //     }
    //     setApiPositions(response.data);
    //     setSelectedPositions(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setShowGraphics(false);
    //     setErrorMsg(
    //       "Uh oh! Something went wrong on our end (failed to load positions data).  If this error persists, contact support."
    //     );
    //   });
  }, [start, end]); //  Calls the API to fetch data at first, whenever start or end date change.

  return (
    <>
      <MsgBanner msg={errorMsg} setMsg={(value) => setErrorMsg(value)} />
      <Content>
        <PositionsHistoryMenu
          start={start}
          setStart={(value) => setStart(value)}
          end={end}
          setEnd={(value) => setEnd(value)}
          setGraphVT={(value) => setGraphVT(value)}
          apiPositions={apiPositions}
          setSelectedPositions={(value) => setSelectedPositions(value)}
        />
        <div className="m-2">
          {showGraphics && graphVT === 0 && (
            <PositionsTimeSeries
              data={formatTimeSeries(
                selectedPositions,
                apiPositions,
                start,
                end,
                false
              )}
              isCurrency
            />
          )}
          {showGraphics && graphVT === 1 && (
            <PositionsTimeSeries
              data={formatTimeSeries(
                selectedPositions,
                apiPositions,
                start,
                end,
                true
              )}
              apiPositions={selectedPositions}
              isCurrency={false}
            />
          )}
        </div>
        <br />
        {showGraphics && (
          <SortableTable
            tableData={selectedPositions}
            tableColumns={POSITIONS_TABLE_COLS}
            initialSort="date"
          />
        )}
      </Content>
    </>
  );
};

export default PositionsHistory;
