import React, { useState, useEffect } from "react";
import { DEFAULT_DATE, POSITIONS_TABLE_COLS } from "../../utils/constants";
import { convertToPercentage } from "../../utils/helpers";
import SortableTable from "../../components/SortableTable";
import PositionsSnapshotMenu from "../../components/positions/PositionsSnapshotMenu";
import PositionsBarChart from "../../components/positions/PositionsBarChart";
import {
  Content,
  SnapshotTwoColWrapper,
  LeftCol,
  RightCol,
} from "../../components/SharedStyles";
import { useBanner } from "../../utils/BannerContext";
import { POSITIONS } from "../../assets/data";

const PositionsSnapshot = () => {
  const [positions, setPositions] = useState(POSITIONS);
  const [date, setDate] = useState(DEFAULT_DATE);
  const [graphVT, setGraphVT] = useState(0);
  const [showGraphics, setShowGraphics] = useState(false);

  const { emitErrorMsg, clearMsg } = useBanner();

  /* Get api data for positions on a single date */
  useEffect(() => {
    clearMsg();
    // setPositions([]);
    setShowGraphics(true);

    const filteredPositions = positions.filter((p) => p.date === date);

    if (filteredPositions.length === 0) {
      setShowGraphics(false);
      emitErrorMsg(
        "No positions exist on the date selected.  Try a different selection."
      );
      return;
    }

    setPositions(filteredPositions);

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
              tableData={positions}
              tableColumns={POSITIONS_TABLE_COLS}
              initialSort="date"
            />
            <br />
          </LeftCol>
          <RightCol>
            {graphVT === 0 && (
              <PositionsBarChart
                tickerData={positions.map(({ ticker }) => ticker)}
                valuesData={positions.map(
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
                tickerData={positions.map(({ ticker }) => ticker)}
                valuesData={convertToPercentage(
                  positions.map(({ position_value }) => position_value)
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
  );
};

export default PositionsSnapshot;
