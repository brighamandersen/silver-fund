import React from "react";
import LoadingSpinner from "../shared/LoadingSpinner";

export const RiskSnapshotTable = (props) => (
  <>
    {props.tableData && props.tableData.date ? (
      <table>
        <thead>
          <tr>
            <th>Risk Exposure</th>
            <th>Total</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ex-Ante Portfolio Risk</td>
            <td>{props.tableData.ex_ante_portfolio_risk_total}</td>
            <td>{props.tableData.ex_ante_portfolio_risk_active}</td>
          </tr>
          <tr>
            <td>Ex-Ante Porfolio Benchmark Beta</td>
            <td>{props.tableData.ex_ante_portfolio_benchmark_beta_total}</td>
            <td>{props.tableData.ex_ante_portfolio_benchmark_beta_active}</td>
          </tr>
          <tr>
            <td>Porfolio Diversification Coefficent</td>
            <td>{props.tableData.portfolio_diversity_coefficient_total}</td>
            <td>{props.tableData.portfolio_diversity_coefficient_active}</td>
          </tr>
          <tr>
            <td>Ex-Ante Porfolio Style Exposure: Momentum</td>
            <td>{props.tableData.ex_ante_momentum_total}</td>
            <td>{props.tableData.ex_ante_momentum_active}</td>
          </tr>
          <tr>
            <td>Ex-Ante Porfolio Style Exposure: Size</td>
            <td>{props.tableData.ex_ante_size_total}</td>
            <td>{props.tableData.ex_ante_size_active}</td>
          </tr>
          <tr>
            <td>Ex-Ante Porfolio Style Exposure: Value</td>
            <td>{props.tableData.ex_ante_value_total}</td>
            <td>{props.tableData.ex_ante_value_active}</td>
          </tr>
          <tr>
            <td>Ex-Ante Porfolio Style Exposure: Quality</td>
            <td>{props.tableData.ex_ante_quality_total}</td>
            <td>{props.tableData.ex_ante_quality_active}</td>
          </tr>
          <tr>
            <td>Ex-Ante Porfolio Style Exposure: Low Volatility</td>
            <td>{props.tableData.ex_ante_low_volatility_total}</td>
            <td>{props.tableData.ex_ante_low_volatility_active}</td>
          </tr>
          <tr>
            <td>Ex-Ante Porfolio Style Exposure: Low Beta</td>
            <td>{props.tableData.ex_ante_low_beta_total}</td>
            <td>{props.tableData.ex_ante_low_beta_active}</td>
          </tr>
        </tbody>
      </table>
    ) : (
      <LoadingSpinner />
    )}
  </>
);

export default RiskSnapshotTable;
