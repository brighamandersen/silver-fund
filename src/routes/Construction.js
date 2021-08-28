import "../components/construction/Construction.css";

import React, { useState, useEffect } from "react";

import { getPaperTarget, getPaperStats, getPaperBench } from "../utils/helpers";
// import MsgBanner from "../components/shared/MsgBanner";
import ConstructionAddRow from "../components/construction/ConstructionAddRow";
import ConstructionProcess from "../components/construction/ConstructionProcess";
import { Content } from "../components/shared/SharedStyles";

export const Construction = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [apiSecurities, setApiSecurities] = useState([]);
  const [paperTarget, setPaperTarget] = useState(getPaperTarget());
  const [liveBench, setLiveBench] = useState([]);
  const [paperBench, setPaperBench] = useState({});
  const [liveTarget, setLiveTarget] = useState([]);
  const [paperStats, setPaperStats] = useState(getPaperStats());
  const [liveStats, setLiveStats] = useState([]);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [currentHoldingsTarget, setCurrentHoldingsTarget] = useState([]);
  const [potentialHoldingsTarget, setPotentialHoldingsTarget] = useState([]);

  useEffect(() => {
    localStorage.setItem("paperTarget", JSON.stringify(paperTarget));
    var currHoldings = paperTarget.filter(function (paperTarget) {
      return paperTarget.current_holding == 1;
    });

    var potHoldings = paperTarget.filter(function (paperTarget) {
      return paperTarget.current_holding == 0;
    });

    setCurrentHoldingsTarget(currHoldings);
    setPotentialHoldingsTarget(potHoldings);
    console.log("Current Paper Target", paperTarget);
  }, [paperTarget]);

  useEffect(() => {
    localStorage.setItem("paperStats", JSON.stringify(paperStats));
  }, [paperStats]);

  const resetToLive = () => {
    setPaperTarget(liveTarget);
    setPaperStats(liveStats);
    setPaperBench(liveBench);
    setHasProcessed(true);
  };

  const getApiSecurities = () => {
    // axios
    //   .get("api/securities/r3000/")
    //   .then((response) => {
    //     console.log("Securities", response.data);
    //     setApiSecurities(response.data);
    //     console.log("Updated", apiSecurities);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setErrorMsg(
    //       "Uh oh! Something went wrong on our end (failed to load positions data).  If this error persists, contact support."
    //     );
    //   });
  };

  const getApiLiveTarget = () => {
    // axios
    //   .get("api/live-target-portfolio/latest/")
    //   .then((response) => {
    //     console.log("Live Target Portfolio", response.data);
    //     // change json key 'asset' to 'asset_id'
    //     // response.data.forEach((el) => {
    //     //   // el["asset_id"] = el["asset"];
    //     //   // delete el["asset"];
    //     //   response.data.forEach((el) => {
    //     //     // el["asset"] = el["asset_id"];
    //     //     // delete el["asset_id"];
    //     //     el["current_holding"] = 1;
    //     //   });
    //     // });
    //     setLiveTarget(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setErrorMsg(
    //       "Uh oh! Something went wrong on our end (failed to load live target porfolio data).  If this error persists, contact support."
    //     );
    //   });
  };

  const getApiLiveStats = () => {
    // axios
    //   .get("api/portfolio-stats/latest/")
    //   .then((response) => {
    //     console.log("Latest Portfolio Stats", response.data);
    //     setLiveStats(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setErrorMsg(
    //       "Uh oh! Something went wrong on our end (failed to load portfolio stats data).  If this error persists, contact support."
    //     );
    //   });
  };

  const getApiLiveBench = () => {
    // axios
    //   .get("api/bench-stats/latest/")
    //   .then((response) => {
    //     console.log("Latest Bench Stats", response.data);
    //     setLiveBench(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setErrorMsg(
    //       "Uh oh! Something went wrong on our end (failed to load portfolio stats data).  If this error persists, contact support."
    //     );
    //   });
  };

  useEffect(() => {
    getApiSecurities();
    getApiLiveTarget();
    getApiLiveStats();
    getApiLiveBench();
  }, []);

  const removePosition = (tickerToRemove) => {
    setHasProcessed(false);
    const tempArrObj = paperTarget.filter((el) => el.ticker !== tickerToRemove);
    setPaperTarget(tempArrObj);
  };

  const onChangeAER = (ticker, value) => {
    setErrorMsg(null);
    setHasProcessed(false);

    let tempArrObj = [...paperTarget];
    tempArrObj.forEach((el) => {
      if (el.ticker === ticker) {
        el.annualized_er = value;
      }
    });
    setPaperTarget(tempArrObj);
  };

  return (
    <>
      {/* <MsgBanner msg={errorMsg} setMsg={(value) => setErrorMsg(value)} /> */}
      <Content>
        <ConstructionProcess
          paperTarget={paperTarget}
          setPaperTarget={(value) => setPaperTarget(value)}
          liveTarget={liveTarget}
          setLiveTarget={(value) => setLiveTarget(value)}
          paperBench={paperBench}
          setPaperBench={(value) => setPaperBench(value)}
          liveBench={liveBench}
          setLiveBench={(vale) => setLiveBench(vale)}
          hasProcessed={hasProcessed}
          setHasProcessed={(value) => setHasProcessed(value)}
          setErrorMsg={(value) => setErrorMsg(value)}
          username={props.username}
          paperStats={paperStats}
          setPaperStats={(value) => setPaperStats(value)}
          setLiveStats={(value) => setLiveStats(value)}
          currentHoldings={currentHoldingsTarget}
        />
        <table className="table-with-select">
          <thead>
            <tr>
              <th className="top-left-cell" style={{ width: "400px" }}>
                <button
                  className="btn white-btn my-2 mx-4 float-left"
                  onClick={resetToLive}
                >
                  Reset To Live
                </button>
                <span className="float-right my-3">Ticker</span>
              </th>
              <th>Model E[r]</th>
              <th>Annualized E[r]</th>
              <th>Beta to Benchmark</th>
              <th>Alpha</th>
              <th>Optimal Active Weight</th>
              <th>Weight in Benchmark</th>
              <th>Our Current Weight</th>
              <th>Backlog</th>
              <th className="top-right-cell">Backlog Risk</th>
              <th className="clear-cell" style={{ width: "85px" }} />
            </tr>
          </thead>
          <tbody>
            {/* Benchmark */}
            <tr>
              <td className="table-subtitle-container clear-cell">
                <h5 className="table-subtitle">Benchmark</h5>
              </td>
            </tr>
            <tr>
              <td>{paperBench.ticker}</td>
              <td>{paperBench.model_er}</td>
              <td>{paperBench.annualized_er}</td>
              <td>{paperBench.beta_to_b}</td>
              <td>{paperBench.alpha}</td>
              <td>{paperBench.oa_weight}</td>
              <td className="blank-cell">N/A</td>
              <td>{paperBench.c_weight}</td>
              <td className="blank-cell">N/A</td>
              <td className="blank-cell">N/A</td>
            </tr>

            <tr>
              <td className="table-subtitle-container clear-cell">
                <h5 className="table-subtitle">Potential Positions</h5>
              </td>
            </tr>

            <ConstructionAddRow
              apiSecurities={apiSecurities}
              setErrorMsg={(value) => setErrorMsg(value)}
              paperTarget={paperTarget}
              setPaperTarget={(value) => setPaperTarget(value)}
              setHasProcessed={(value) => setHasProcessed(value)}
            />

            {potentialHoldingsTarget.map((el) => (
              <tr key={el.ticker}>
                <td>{el.ticker}</td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.model_er}
                </td>

                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  <input
                    style={{ width: "100%" }}
                    className={
                      !hasProcessed
                        ? (el.annualized_er === ""
                            ? "bolded-cell"
                            : undefined) ||
                          (el.annualized_er < -1 ? "error-cell" : undefined) ||
                          (el.annualized_er > 1 ? "warning-cell" : undefined)
                        : undefined
                    }
                    type="number"
                    step="0.01"
                    min="-1"
                    max="1"
                    placeholder="Enter Decimal"
                    value={el.annualized_er}
                    onChange={(e) => onChangeAER(el.ticker, e.target.value)}
                  />
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.beta_to_b}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.alpha}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.oa_weight}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.b_weight}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.c_weight}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.backlog}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.backlog_risk}
                </td>
                <td className="clear-cell">
                  <button
                    className="btn delete-table-row-btn"
                    onClick={() => removePosition(el.ticker)}
                  >
                    🞬
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td className="table-subtitle-container clear-cell">
                <h5 className="table-subtitle">Active Positions</h5>
              </td>
            </tr>
            {currentHoldingsTarget.map((el) => (
              <tr key={el.ticker}>
                <td>{el.ticker}</td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.model_er}
                </td>

                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  <input
                    style={{ width: "100%" }}
                    className={
                      !hasProcessed
                        ? (el.annualized_er === ""
                            ? "bolded-cell"
                            : undefined) ||
                          (el.annualized_er < -1 ? "error-cell" : undefined) ||
                          (el.annualized_er > 1 ? "warning-cell" : undefined)
                        : undefined
                    }
                    type="number"
                    step="0.01"
                    min="-1"
                    max="1"
                    placeholder="Enter Decimal"
                    value={el.annualized_er}
                    onChange={(e) => onChangeAER(el.ticker, e.target.value)}
                  />
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.beta_to_b}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.alpha}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.oa_weight}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.b_weight}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.c_weight}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.backlog}
                </td>
                <td className={!hasProcessed ? "blank-cell" : undefined}>
                  {el.backlog_risk}
                </td>
                <td className="clear-cell">
                  <button
                    className="btn delete-table-row-btn"
                    onClick={() => removePosition(el.ticker)}
                  >
                    🞬
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </Content>
    </>
  );
};

export default Construction;
