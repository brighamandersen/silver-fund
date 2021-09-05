import React, { useState, useEffect } from "react";
import {
  DEFAULT_START_DATE,
  POSITIONS_GVT_OPTIONS,
  POSITIONS_TABLE_COLS,
} from "../../utils/constants";
import { convertToPercentage } from "../../utils/helpers";
import SortableTable from "../../components/SortableTable";
import PositionsBarChart from "../../components/PositionsBarChart";
import {
  Content,
  SnapshotTwoColWrapper,
  LeftCol,
  RightCol,
} from "../../components/SharedStyles";
import { useBanner } from "../../utils/BannerContext";
import { POSITIONS } from "../../assets/positions";
import DateSingler from "../../components/DateSingler";
import GraphViewType from "../../components/GraphViewType";

const PositionsSnapshot = () => {
  const [positions, setPositions] = useState(POSITIONS);
  const [date, setDate] = useState(DEFAULT_START_DATE);
  const [graphVT, setGraphVT] = useState(0);
  const [showGraphics, setShowGraphics] = useState(false);

  const { emitErrorMsg, clearMsg } = useBanner();

  useEffect(() => {
    clearMsg();
    setShowGraphics(true);
    setPositions([]);

    const filteredPositions = POSITIONS.filter((p) => p.date === date);

    if (filteredPositions.length === 0) {
      setShowGraphics(false);
      emitErrorMsg(
        "No positions exist on the date selected.  Try a different selection."
      );
      return;
    }

    setPositions(filteredPositions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, graphVT]);

  const SubMenu = () => (
    <>
      <div className="d-inline-block">
        <DateSingler date={date} setDate={setDate} />
      </div>
      <div className="float-right">
        <GraphViewType
          dropdownOptions={POSITIONS_GVT_OPTIONS}
          setGraphVT={setGraphVT}
        />
      </div>
      <hr />
    </>
  );

  return (
    <Content>
      <SubMenu />
      {showGraphics && (
        <SnapshotTwoColWrapper>
          <LeftCol>
            <SortableTable
              tableData={positions}
              tableColumns={POSITIONS_TABLE_COLS}
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
              />
            )}
          </RightCol>
        </SnapshotTwoColWrapper>
      )}
    </Content>
  );
};

export default PositionsSnapshot;
