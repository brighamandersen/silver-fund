import React from "react";

import { formatAsDecimal } from "../../utils/helpers";
import axios from "axios";

const ConstructionProcess = (props) => {
  const runPortOpt = () => {
    // axios
    //   .get("api/port-opt", {
    //     params: {
    //       paperTarget: props.paperTarget,
    //       paperStats: props.paperStats,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Port Opt Response", response.data);
    //     props.setPaperTarget(response.data[0].slice(1));
    //     props.setPaperStats(response.data[1]);
    //     props.setPaperBench(response.data[0].slice(0, 1)[0]);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // setErrorMsg(
    //     //   "Uh oh! Something went wrong on our end (failed to load positions data).  If this error persists, contact support."
    //     // );
    //   });
  };

  const onProcessClick = () => {
    console.log(props.paperTarget);
    const badInput = props.paperTarget.some((el) => el.annualized_er < -1);
    const noInput = props.paperTarget.some((el) => el.annualized_er === "");
    const notEnoughInput = props.currentHoldings.length < 3;
    console.log("Current", notEnoughInput);
    let badER;
    const highInput = props.paperTarget.some((el) => {
      if (el.annualized_er > 1) {
        badER = el.annualized_er;
        return true;
      }
      return false;
    });

    if (badInput) {
      props.setErrorMsg(
        "Input for each position's annualized E[r] must at least be -1."
      );
    } else if (noInput) {
      props.setErrorMsg(
        "Please add input for each position's annualized E[r] before processing."
      );
    } else if (notEnoughInput) {
      props.setErrorMsg(
        "Please include at least 3 active position's before processing."
      );
    } else {
      if (highInput) {
        alert(
          `Warning: Decimal input greater than 1.00.\n\nDo you really expect a ${
            (badER * 10) / 0.1
          }% return?\n\nInput will process, but decimal expected, so if you meant a ${badER}% return, enter it as ${
            (badER * 10) / 1000
          } then hit 'Process' again.`
        );
      }

      // AXIOS TO BACKEND SEND PROPS.PAPERTARGET AND PAPERSTATS
      // AND RETURN NEW PAPERTARGET AND PAPERSTATS SAME FORMATT
      console.log("Target", props.paperTarget);
      runPortOpt();
      props.setHasProcessed(true);

      // let processedTarget = [...props.paperTarget];
      // processedTarget.forEach((el) => {
      //   el.model_er = formatAsDecimal(Math.random());
      //   el.beta_to_b = formatAsDecimal(Math.random());
      //   el.alpha = formatAsDecimal(Math.random());
      //   el.oa_weight = formatAsDecimal(Math.random());
      //   el.b_weight = formatAsDecimal(Math.random());
      //   el.c_weight = formatAsDecimal(Math.random());
      //   el.backlog = formatAsDecimal(Math.random());
      //   el.backlog_risk = formatAsDecimal(Math.random());
      // });
      // props.setPaperTarget(processedTarget);

      // let processedStats = props.paperStats;
      // processedStats.expected_return = formatAsDecimal(Math.random());
      // processedStats.beta_to_b = formatAsDecimal(Math.random());
      // processedStats.alpha_to_b = formatAsDecimal(Math.random());
      // processedStats.info_ratio = formatAsDecimal(Math.random());
      // props.setPaperStats(processedStats);
      // localStorage.setItem("paperTarget", JSON.stringify(props.paperTarget));
    }
  };

  const commitToLiveApi = () => {
    if (
      window.confirm(
        "Do you really want to overwrite the live target portfolio with your current paper target portfolio?  If so, press 'OK'."
      )
    ) {
      const username = prompt("Enter your username to confirm your commit:");
      if (username === null) {
        return;
      } else if (username !== localStorage.getItem("username")) {
        alert(
          "Incorrect username entered.  If you wish to make this commit, verify your username and try again."
        );
        return;
      }
    } else {
      return;
    }

    // change json key 'asset_id' back to 'asset', add commit_maker
    let newTarget = props.paperTarget;
    console.log("COMMIT", newTarget);
    newTarget.forEach((el) => {
      // el["asset"] = el["asset_id"];
      // delete el["asset_id"];
      el["commit_maker"] = props.username;
      el["is_latest"] = true;
    });

    // axios
    //   .post("api/live-target-portfolio/commit/", newTarget)
    //   .then((response) => {
    //     console.log(props.paperTarget);
    //     console.log(newTarget);
    //     alert("Successfully committed target portfolio!");
    //     console.log("New Live Target Portfolio", response.data);
    //     props.setLiveTarget(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     props.setErrorMsg(
    //       "Uh oh! Something went wrong when committing your paper target portfolio to live."
    //     );
    //   });

    let newStats = props.paperStats;
    newStats.commit_maker = props.username;
    // axios
    //   .post("api/portfolio-stats/commit/", newStats)
    //   .then((response) => {
    //     alert("Successfully committed porfolio stats!");
    //     console.log("New Portfolio Stats", response.data);
    //     props.setLiveStats(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     props.setErrorMsg(
    //       "Uh oh! Something went wrong when committing your paper portfolio stats to live."
    //     );
    //   });

    let newBench = props.paperBench;
    newBench["b_weight"] = 0;
    newBench["is_latest"] = 1;
    newBench.commit_maker = props.username;
    // axios
    //   .post("api/bench-stats/commit/", newBench)
    //   .then((response) => {
    //     console.log(newBench);
    //     alert("Successfully committed target bench!");
    //     console.log("New Live Target Bench", response.data);
    //     props.setLiveTarget(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     props.setErrorMsg(
    //       "Uh oh! Something went wrong when committing your paper target portfolio to live."
    //     );
    //   });
  };

  return (
    <>
      <h5 style={{ paddingLeft: "20px" }}>Portfolio Ex-Ante Stats</h5>
      <table style={{ width: "50%", display: "inline" }}>
        <thead>
          <tr>
            <th className="top-left-cell">E[r]</th>
            <th>Beta to Benchmark</th>
            <th>Alpha to Benchmark</th>
            <th className="top-right-cell">IR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className={
                !props.hasProcessed
                  ? "btm-left-cell blank-cell"
                  : "btm-left-cell"
              }
            >
              {props.paperStats.expected_return}
            </td>
            <td className={!props.hasProcessed ? "blank-cell" : undefined}>
              {props.paperStats.beta_to_b}
            </td>
            <td className={!props.hasProcessed ? "blank-cell" : undefined}>
              {props.paperStats.alpha_to_b}
            </td>
            <td
              className={
                !props.hasProcessed
                  ? "btm-right-cell blank-cell"
                  : "btm-right-cell"
              }
            >
              {props.paperStats.info_ratio}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="btn white-btn mx-4 float-right"
        onClick={commitToLiveApi}
        disabled={props.paperTarget === props.liveTarget}
      >
        Commit Changes From Paper to Live
      </button>

      {props.paperTarget.length > 0 && (
        <button className="btn m-4" onClick={onProcessClick}>
          Process
        </button>
      )}

      <hr />
      <br />
    </>
  );
};

export default ConstructionProcess;
