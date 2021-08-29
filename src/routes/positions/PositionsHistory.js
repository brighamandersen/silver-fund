import React, { useState, useEffect } from "react";
import {
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  POSITIONS_GVT_OPTIONS,
  POSITIONS_TABLE_COLS,
} from "../../utils/constants";
import { formatTimeSeries } from "../../utils/helpers";
import PositionsTimeSeries from "../../components/positions/PositionsTimeSeries";
import SortableTable from "../../components/SortableTable";
import { Content } from "../../components/SharedStyles";
import styled from "styled-components";
import DateRanger from "../../components/DateRanger";
import TickerSelector from "../../components/TickerSelector";
import GraphViewType from "../../components/GraphViewType";
import { useBanner } from "../../utils/BannerContext";
import { POSITIONS } from "../../assets/positions";

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

const PositionsHistory = () => {
  const [positions, setPositions] = useState([]);
  const [start, setStart] = useState(DEFAULT_START_DATE);
  const [end, setEnd] = useState(DEFAULT_END_DATE);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [graphVT, setGraphVT] = useState(0);
  const [showGraphics, setShowGraphics] = useState(false);

  const { emitErrorMsg, clearMsg } = useBanner();

  useEffect(() => {
    clearMsg();
    setShowGraphics(true);
    setPositions([]);

    if (end < start) {
      setShowGraphics(false);
      emitErrorMsg("Warning: Start date isn't before end date.");
      return;
    }

    const filteredPositions = POSITIONS.filter(
      (p) => p.date >= start && p.date <= end
    );

    if (filteredPositions.length === 0) {
      setShowGraphics(false);
      emitErrorMsg(
        "No positions exist on the date range selected.  Try a different selection."
      );
    }

    setPositions(filteredPositions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            optionsData={positions}
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
      <SubMenu />
      <div className="m-2">
        {showGraphics && graphVT === 0 && (
          <PositionsTimeSeries
            data={formatTimeSeries(
              selectedPositions,
              positions,
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
              positions,
              start,
              end,
              true
            )}
            positions={selectedPositions}
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
