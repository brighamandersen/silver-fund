import "../components/construction/Construction.css";

import React, { useState } from "react";

import { Content } from "../components/SharedStyles";
import Select from "react-select";
import { CUSTOM_SELECT_THEME } from "../utils/constants";
import { useBanner } from "../utils/BannerContext";
import { POSITIONS } from "../assets/positions";
import { getStatDecimal } from "../utils/helpers";

const DEFAULT_POSITION = {
  ticker: "-",
  modelEr: "-",
  annualizedEr: "-",
  betaToBenchmark: "-",
  alpha: "-",
  optActiveWeight: "-",
  benchmarkWeight: "-",
  currentWeight: "-",
  backlog: "-",
  backlogRisk: "-",
};

const DEFAULT_EXANTE_STATS = {
  expectedReturn: "-",
  betaToBenchmark: "-",
  alphaToBenchmark: "-",
  infoRatio: "-",
};

const Construction = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [exAnteStats, setExAnteStats] = useState(DEFAULT_EXANTE_STATS);

  const { emitErrorMsg, clearMsg } = useBanner();

  const addPosition = (value) => {
    clearMsg();

    const alreadyExists = portfolio.some((p) => p.ticker === value.ticker);

    if (!alreadyExists) {
      setPortfolio([
        ...portfolio,
        {
          ticker: value.ticker,
          modelEr: "-",
          annualizedEr: "",
          betaToBenchmark: "-",
          alpha: "-",
          optActiveWeight: "-",
          benchmarkWeight: "-",
          currentWeight: "-",
          backlog: "-",
          backlogRisk: "-",
        },
      ]);
      setHasProcessed(false);
    } else {
      emitErrorMsg(
        "That position is already an active position.  Try selecting a different one."
      );
    }
  };

  const removePosition = (tickerToRemove) => {
    setHasProcessed(false);
    const temp = portfolio.filter((p) => p.ticker !== tickerToRemove);
    setPortfolio(temp);
  };

  const changeAnnualizedEr = (ticker, value) => {
    emitErrorMsg(null);
    setHasProcessed(false);

    let temp = [...portfolio];
    temp.forEach((t) => {
      if (t.ticker === ticker) {
        t.annualizedEr = value;
      }
    });
    setPortfolio(temp);
  };

  const generateExanteStats = () => {
    const temp = DEFAULT_EXANTE_STATS;
    temp.expectedReturn = getStatDecimal();
    temp.betaToBenchmark = getStatDecimal();
    temp.alphaToBenchmark = getStatDecimal();
    temp.infoRatio = getStatDecimal();
    setExAnteStats(temp);
  };

  const processPortfolio = () => {
    const badInput = portfolio.some((p) => p.annualizedEr < -1);
    const noInput = portfolio.some((p) => p.annualizedEr === "");
    const notEnoughInput = portfolio.length < 3;
    let badER;
    const highInput = portfolio.some((p) => {
      if (p.annualizedEr > 1) {
        badER = p.annualizedEr;
        return true;
      }
      return false;
    });

    if (badInput) {
      emitErrorMsg(
        "Input for each position's annualized E[r] must at least be -1."
      );
      return;
    }
    if (noInput) {
      emitErrorMsg(
        "Please add input for each position's annualized E[r] before processing."
      );
      return;
    }
    if (notEnoughInput) {
      emitErrorMsg(
        "Please include at least 3 active position's before processing."
      );
      return;
    }

    if (highInput) {
      alert(
        `Warning: Decimal input greater than 1.00.\n\nDo you really expect a ${
          (badER * 10) / 0.1
        }% return?\n\nInput will process, but decimal expected, so if you meant a ${badER}% return, enter it as ${
          (badER * 10) / 1000
        } then hit 'Process' again.`
      );
    }

    setHasProcessed(true);
    generateExanteStats();
  };

  const RowAdder = () => (
    <tr>
      <td className="blank-cell btm-left-cell">
        <Select
          theme={CUSTOM_SELECT_THEME}
          options={POSITIONS}
          noOptionsMessage={() => "No matches found.  Try again."}
          placeholder="Add New (Type to Search)"
          value={null}
          onChange={addPosition}
          isSearchable
          getOptionLabel={(option) => option.ticker}
        />
      </td>
      <td className="blank-cell" />
      <td className="blank-cell">
        <input disabled />
      </td>
      <td className="blank-cell" />
      <td className="blank-cell" />
      <td className="blank-cell" />
      <td className="blank-cell" />
      <td className="blank-cell" />
      <td className="blank-cell" />
      <td className="blank-cell btm-right-cell" />
    </tr>
  );

  const ExAnteStats = () => (
    <>
      <h4 style={{ paddingLeft: "20px" }}>Portfolio Ex-Ante Stats</h4>
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
                !hasProcessed ? "btm-left-cell blank-cell" : "btm-left-cell"
              }
            >
              {exAnteStats.expectedReturn}
            </td>
            <td className={!hasProcessed && "blank-cell"}>
              {exAnteStats.betaToBenchmark}
            </td>
            <td className={!hasProcessed && "blank-cell"}>
              {exAnteStats.alphaToBenchmark}
            </td>
            <td
              className={
                !hasProcessed ? "btm-right-cell blank-cell" : "btm-right-cell"
              }
            >
              {exAnteStats.infoRatio}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );

  return (
    <Content>
      <table className="table-with-select">
        <thead>
          <tr>
            <th className="top-left-cell" style={{ width: "300px" }}>
              Ticker
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
          <RowAdder />
          {portfolio.map((p) => (
            <tr key={p.ticker}>
              <td>{p.ticker}</td>
              <td className={!hasProcessed & "blank-cell"}>{p.modelEr}</td>

              <td className={!hasProcessed & "blank-cell"}>
                <input
                  style={{ width: "100%" }}
                  className={
                    !hasProcessed & ((p.annualizedEr === "") & "bolded-cell") ||
                    (p.annualizedEr < -1) & "error-cell" ||
                    (p.annualizedEr > 1) & "warning-cell"
                  }
                  type="number"
                  step="0.01"
                  min="-1"
                  max="1"
                  placeholder="Enter Decimal"
                  value={p.annualizedEr}
                  onChange={(e) => changeAnnualizedEr(p.ticker, e.target.value)}
                />
              </td>
              <td className={!hasProcessed ? "blank-cell" : undefined}>
                {p.betaToBenchmark}
              </td>
              <td className={!hasProcessed ? "blank-cell" : undefined}>
                {p.alpha}
              </td>
              <td className={!hasProcessed ? "blank-cell" : undefined}>
                {p.optActiveWeight}
              </td>
              <td className={!hasProcessed ? "blank-cell" : undefined}>
                {p.benchmarkWeight}
              </td>
              <td className={!hasProcessed ? "blank-cell" : undefined}>
                {p.currentWeight}
              </td>
              <td className={!hasProcessed ? "blank-cell" : undefined}>
                {p.backlog}
              </td>
              <td className={!hasProcessed ? "blank-cell" : undefined}>
                {p.backlogRisk}
              </td>
              <td className="clear-cell">
                <button
                  className="btn delete-table-row-btn"
                  onClick={() => removePosition(p.ticker)}
                >
                  🞬
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {portfolio.length > 0 && (
        <button className="btn m-4" onClick={processPortfolio}>
          Process
        </button>
      )}
      <hr />
      <br />
      <ExAnteStats />
    </Content>
  );
};

export default Construction;
