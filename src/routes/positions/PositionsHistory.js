import React, { useState, useEffect } from "react";
import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  POSITIONS_GVT_OPTIONS,
  POSITIONS_TABLE_COLS,
} from "../../utils/constants";
import {
  getDateStr,
  getDateStr3MonthsBack,
  formatTimeSeries,
} from "../../utils/helpers";
import PositionsTimeSeries from "../../components/positions/PositionsTimeSeries";
import SortableTable from "../../components/SortableTable";
import { Content } from "../../components/SharedStyles";
import styled from "styled-components";
import DateRanger from "../../components/DateRanger";
import TickerSelector from "../../components/TickerSelector";
import GraphViewType from "../../components/GraphViewType";

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

const PositionsHistory = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [apiPositions, setApiPositions] = useState([]);
  const [start, setStart] = useState(DEFAULT_START_DATE);
  const [end, setEnd] = useState(DEFAULT_END_DATE);
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
  }, [start, end]);

  const SubMenu = () => (
    <>
      <MenuWrapper>
        <div>
          <DateRanger
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
          />
        </div>
        <div>
          <TickerSelector
            optionsData={apiPositions}
            onSubmit={(newValue) => setSelectedPositions(newValue)}
          />
        </div>
        <div>
          <GraphViewType
            dropdownOptions={POSITIONS_GVT_OPTIONS}
            setGraphVT={setGraphVT}
          />
        </div>
      </MenuWrapper>
      <hr />
    </>
  );

  return (
    <Content>
      {/* <PositionsHistoryMenu
        start={start}
        setStart={(value) => setStart(value)}
        end={end}
        setEnd={(value) => setEnd(value)}
        setGraphVT={(value) => setGraphVT(value)}
        apiPositions={apiPositions}
        setSelectedPositions={(value) => setSelectedPositions(value)}
      /> */}
      <SubMenu />
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
        />
      )}
    </Content>
  );
};

export default PositionsHistory;
