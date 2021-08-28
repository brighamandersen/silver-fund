import React from "react";

import DateSingler from "../DateSingler";
import GraphViewType from "../GraphViewType";
import { POSITIONS_GVT_OPTIONS } from "../../utils/constants";

const PositionsSnapshotMenu = (props) => (
  <>
    <div className="d-inline-block">
      <DateSingler date={props.date} setDate={props.setDate} />
    </div>
    <div className="float-right">
      <GraphViewType
        dropdownOptions={POSITIONS_GVT_OPTIONS}
        setGraphVT={props.setGraphVT}
      />
    </div>
    <hr />
  </>
);

export default PositionsSnapshotMenu;
