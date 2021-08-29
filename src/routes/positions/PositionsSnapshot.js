import React, { useState, useEffect } from "react";
import { POSITIONS_TABLE_COLS } from "../../utils/constants";
import { getDateStr, convertToPercentage } from "../../utils/helpers";
import SortableTable from "../../components/SortableTable";
import PositionsSnapshotMenu from "../../components/positions/PositionsSnapshotMenu";
import PositionsBarChart from "../../components/positions/PositionsBarChart";
import {
  Content,
  SnapshotTwoColWrapper,
  LeftCol,
  RightCol,
} from "../../components/SharedStyles";
import { PositionsSubNavbar } from "../../components/nav/SubNavbars";

const PositionsSnapshot = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [apiPositions, setApiPositions] = useState([]);
  const [date, setDate] = useState(getDateStr(-1));
  const [graphVT, setGraphVT] = useState(0);
  const [showGraphics, setShowGraphics] = useState(false);

  /* Get api data for positions on a single date */
  useEffect(() => {
    setErrorMsg(null);
    setApiPositions([]);
    setShowGraphics(true);

    // axios
    //   .get("api/positions/filter/date/", {
    //     params: {
    //       start: date,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Positions on " + date, response.data);
    //     if (response.data.length === 0) {
    //       setShowGraphics(false);
    //       setErrorMsg(
    //         "No positions exist on the date selected.  Try a different selection."
    //       );
    //     }
    //     setApiPositions(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setShowGraphics(false);
    //     setErrorMsg(
    //       "Uh oh! Something went wrong on our end (failed to load positions data).  If this error persists, contact support."
    //     );
    //   });
  }, [date, graphVT]); // Calls the API to fetch data at first, whenever date changes.

  return (
    <>
      <PositionsSubNavbar />
      {/* <MsgBanner msg={errorMsg} setMsg={(value) => setErrorMsg(value)} /> */}
      <Content>
        <PositionsSnapshotMenu
          date={date}
          setDate={setDate}
          setGraphVT={(value) => setGraphVT(value)}
        />
        {showGraphics && (
          <SnapshotTwoColWrapper>
            <LeftCol>
              <SortableTable
                tableData={apiPositions}
                tableColumns={POSITIONS_TABLE_COLS}
                initialSort="date"
              />
              <br />
            </LeftCol>
            <RightCol>
              {graphVT === 0 && (
                <PositionsBarChart
                  tickerData={apiPositions.map(({ ticker }) => ticker)}
                  valuesData={apiPositions.map(
                    ({ position_value }) => position_value
                  )}
                  x_label={"Position Value (USD)"}
                  tool_tip_label={"Value"}
                  isCurrency
                  buffer={5000}
                />
              )}
              {graphVT === 1 && (
                <PositionsBarChart
                  tickerData={apiPositions.map(({ ticker }) => ticker)}
                  valuesData={convertToPercentage(
                    apiPositions.map(({ position_value }) => position_value)
                  )}
                  x_label={"Percent of Portfolio"}
                  tool_tip_label={"Percent"}
                  isCurrency={false}
                  buffer={10}
                />
              )}
            </RightCol>
          </SnapshotTwoColWrapper>
        )}
      </Content>
    </>
  );
};

export default PositionsSnapshot;
