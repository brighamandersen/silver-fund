import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDateStr } from "../../utils/helpers";
import MsgBanner from "../shared/MsgBanner";
import RiskSnapshotTable from "./RiskSnapshotTable";
import RiskBarChart from "./RiskBarChart";
import { RISK_SNAPSHOT_GVT_OPTIONS } from "../../utils/constants";
import {
  Content,
  SnapshotTwoColWrapper,
  LeftCol,
  RightCol,
} from "../shared/SharedStyles";
import RiskSnapshotMenu from "./RiskSnapshotMenu";

export const RiskSnapshot = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [apiSnapshot, setApiSnapshot] = useState({});
  const [riskSnapshot, setRiskSnapshot] = useState([]);
  const [graphVT, setGraphVT] = useState(0);
  const [riskVT, setRiskVT] = useState("total");
  const [date, setDate] = useState(getDateStr(-1));
  const [showGraphics, setShowGraphics] = useState(false);

  useEffect(() => {
    setErrorMsg(null);
    setApiSnapshot({});
    setShowGraphics(true);

    // axios
    //   .get("api/portfolio_performance/filter/date/", {
    //     params: {
    //       start: date,
    //     },
    //   })
    //   .then((response) => {
    //     let resData = response.data[0];
    //     console.log("Risk Snapshot on " + date, resData);
    //     if (resData === undefined) {
    //       setShowGraphics(false);
    //       setErrorMsg("Invalid date selected.  Try a different selection.");
    //     } else {
    //       //Round down values to 3 decimal places
    //       for (let key in resData) {
    //         if (typeof resData[key] === "number") {
    //           resData[key] = Math.round(resData[key] * 1000) / 1000;
    //         }
    //       }
    //     }
    //     setApiSnapshot(resData);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setShowGraphics(false);
    //     setErrorMsg(
    //       "Uh oh! Something went wrong on our end (failed to load portfolio risk snapshot data).  If this error persists, contact support."
    //     );
    //   });
  }, [date]); // Calls the API to fetch data at first, whenever date changes

  useEffect(() => {
    setErrorMsg(null);
    setRiskSnapshot([]);
    setShowGraphics(true);

    axios //Fist get the securities risks
      .get("api/security-risk/filter/date/", {
        params: {
          start: date,
          graphVT: graphVT,
          riskVT: riskVT,
        },
      })
      .then((response) => {
        let resData = response.data[0];
        if (resData === undefined) {
          setShowGraphics(false);
          setErrorMsg("Invalid date selected.  Try a different selection.");
        }
        //Cut down to the top 10
        setRiskSnapshot(response.data);
      })
      .catch((error) => {
        console.log(error);
        setShowGraphics(false);
        setErrorMsg(
          "Uh oh! Something went wrong on our end (failed to load security risk snapshot data).  If this error persists, contact support."
        );
      });
  }, [date, riskVT, graphVT]);

  return (
    <>
      <MsgBanner msg={errorMsg} setMsg={(value) => setErrorMsg(value)} />
      <Content>
        <RiskSnapshotMenu
          date={date}
          setDate={setDate}
          riskVT={riskVT}
          setRiskVT={setRiskVT}
          setGraphVT={setGraphVT}
        />
        {showGraphics && (
          // FIXME the bar chart is using random fields for the first three risk till we get the model working
          <SnapshotTwoColWrapper>
            <LeftCol>
              <RiskSnapshotTable tableData={apiSnapshot} />
            </LeftCol>
            <RightCol>
              <RiskBarChart
                tickerData={riskSnapshot.map(({ ticker }) => ticker)}
                valuesData={riskSnapshot.map(({ graph_data }) => graph_data)}
                x_label={RISK_SNAPSHOT_GVT_OPTIONS[parseInt(graphVT)]["label"]}
                tool_tip_label={"Value"}
                buffer={5000}
              />
            </RightCol>
          </SnapshotTwoColWrapper>
        )}
      </Content>
    </>
  );
};

export default RiskSnapshot;
