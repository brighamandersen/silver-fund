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
import { POSITIONS } from "../../assets/positions";

const PositionsSnapshot = () => {
  const [positions, setPositions] = useState(POSITIONS);
  const [date, setDate] = useState(DEFAULT_DATE);
  const [graphVT, setGraphVT] = useState(0);
  const [showGraphics, setShowGraphics] = useState(false);

  const { emitErrorMsg, clearMsg } = useBanner();

  useEffect(() => {
    clearMsg();
    setPositions([]);
    setShowGraphics(true);

    console.log("ran");

    const filteredPositions = positions.filter((p) => p.date === date);

    if (filteredPositions.length === 0) {
      setShowGraphics(false);
      emitErrorMsg(
        "No positions exist on the date selected.  Try a different selection."
      );
      // return;
    }

    setPositions(filteredPositions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, graphVT]);

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
                valuesData={positions.map(({ value }) => value)}
                xLabel={"Position Value (USD)"}
                tooltipLabel={"Value"}
                isCurrency
              />
            )}
            {graphVT === 1 && (
              <PositionsBarChart
                tickerData={positions.map(({ ticker }) => ticker)}
                valuesData={convertToPercentage(
                  positions.map(({ value }) => value)
                )}
                xLabel={"Percent of Portfolio"}
                tooltipLabel={"Percent"}
                isCurrency={false}
              />
            )}
          </RightCol>
        </SnapshotTwoColWrapper>
      )}
    </Content>
  );
};

export default PositionsSnapshot;
