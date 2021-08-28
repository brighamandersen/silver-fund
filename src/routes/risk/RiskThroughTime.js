import React, { useState, useEffect } from "react";
import {
  getDateStr,
  getDateStr3MonthsBack,
  formatRiskTimeSeries,
} from "../../utils/helpers";
import { Content } from "../../components/shared/SharedStyles";
import RiskThroughTimeMenu from "../../components/risk/RiskThroughTimeMenu";
import RiskTimerSeries from "../../components/risk/RiskTimeSeries";
import { RISK_THROUGHTIME_GVT_OPTIONS } from "../../utils/constants";

const RiskThroughTime = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [graphVT, setGraphVT] = useState(0);
  const [riskVT, setRiskVT] = useState("total");
  const [unitType, setUnitType] = useState("portfolio");
  const [aggrType, setAggrType] = useState("");
  const [start, setStart] = useState(getDateStr3MonthsBack());
  const [end, setEnd] = useState(getDateStr(-1));
  const [graphData, setGraphData] = useState([]);
  const [vTOptions, setVTOptions] = useState(RISK_THROUGHTIME_GVT_OPTIONS);

  useEffect(() => {
    if (unitType === "portfolio") {
      setVTOptions(RISK_THROUGHTIME_GVT_OPTIONS.slice(0, 8));
    }
    if (unitType === "industry") {
      setVTOptions(
        RISK_THROUGHTIME_GVT_OPTIONS.slice(0, 6).concat(
          RISK_THROUGHTIME_GVT_OPTIONS.slice(7, 12)
        )
      );
    }
    if (unitType === "factor") {
      setVTOptions(
        RISK_THROUGHTIME_GVT_OPTIONS.slice(0, 3).concat(
          RISK_THROUGHTIME_GVT_OPTIONS.slice(8, 12)
        )
      );
    }
    if (unitType === "stock") {
      setVTOptions(
        RISK_THROUGHTIME_GVT_OPTIONS.slice(0, 6).concat(
          RISK_THROUGHTIME_GVT_OPTIONS.slice(7, 12)
        )
      );
    }
  }, [unitType]);

  useEffect(() => {
    setErrorMsg(null);
    setGraphData([]);

    // axios
    //   .get("api/portfolio_performance/filter/feild/", {
    //     params: {
    //       start: start,
    //       end: end,
    //       graphVT: graphVT,
    //       riskVT: riskVT,
    //     },
    //   })
    //   .then((response) => {
    //     let resData = response.data;
    //     console.log("Risk Snapshot on ", resData);
    //     if (resData === undefined) {
    //       // setShowGraphics(false);
    //       setErrorMsg("Invalid date selected.  Try a different selection.");
    //     } else {
    //       setGraphData(formatRiskTimeSeries(resData, graphVT, riskVT));
    //       console.log("GRAPH DATA", graphData);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setGraphData(formatRiskTimeSeries([], 6, 7));
    //     setErrorMsg(
    //       "Uh oh! Something went wrong on our end (failed to load portfolio risk snapshot data).  If this error persists, contact support."
    //     );
    //   });
  }, [graphVT, riskVT, unitType, start, end]);

  return (
    <Content>
      <RiskThroughTimeMenu
        start={start}
        end={end}
        setStart={setStart}
        setEnd={setEnd}
        riskVT={riskVT}
        setRiskVT={setRiskVT}
        unitType={unitType}
        setUnitType={setUnitType}
        aggrType={aggrType}
        setAggrType={setAggrType}
        setGraphVT={setGraphVT}
        vTOptions={vTOptions}
      />
      <RiskTimerSeries data={graphData} isCurrency={false} />
    </Content>
  );
};

export default RiskThroughTime;
