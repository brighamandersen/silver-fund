import React from "react";

import DateRanger from "../shared/DateRanger";
import GraphViewType from "../shared/GraphViewType";
import TickerSelector from "../shared/TickerSelector";
import { POSITIONS_GVT_OPTIONS } from "../../utils/constants";
import styled from "styled-components";

const LocalMenu = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

export const PositionsHistoryMenu = (props) => (
  <>
    <LocalMenu>
      <div>
        <DateRanger
          start={props.start}
          end={props.end}
          setStart={props.setStart}
          setEnd={props.setEnd}
        />
      </div>
      <div>
        <TickerSelector
          optionsData={props.apiPositions}
          onSubmit={(newValue) => props.setSelectedPositions(newValue)}
        />
      </div>
      <div>
        <GraphViewType
          dropdownOptions={POSITIONS_GVT_OPTIONS}
          setGraphVT={props.setGraphVT}
        />
      </div>
    </LocalMenu>
    <hr />
  </>
);

export default PositionsHistoryMenu;
