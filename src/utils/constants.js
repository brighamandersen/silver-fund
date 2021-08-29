import React from "react";
import { formatAsAmount, formatAsCurrency } from "./helpers";

/* Website Color Scheme */
export const COLORS = {
  navy: "#002e5d",
  white: "#ffffff",
  silver: "#cfcfcf",
  black: "#000000",
  fade1: "rgba(207, 207, 207, 0.2)",
  fade2: "rgba(207, 207, 207, 0.7)",
  slate: "slategray",
  darkSlate: "darkslategray",
  clear: "transparent",
  lightHover: "rgba(0,0,0,0.05)",
  blackHover: "#363636",
  errorRed: "#e53935",
  successGreen: "#0fb56d",
};

export const CORNER_ROUNDING = "15px";

export const DEFAULT_DATE = "2021-01-01";

/* Custom theme for React Select */
export const CUSTOM_SELECT_THEME = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: COLORS.silver,
    primary: COLORS.navy,
  },
});

export const POSITIONS_GVT_OPTIONS = [
  { value: 0, label: "$ Positions by Stock" },
  { value: 1, label: "% Positions by Stock" },
];

export const POSITIONS_TABLE_COLS = [
  {
    Header: "Asset ID",
    accessor: "assetId",
  },
  {
    Header: "Ticker",
    accessor: "ticker",
  },
  {
    Header: "# of Shares",
    accessor: "numShares",
    Cell: (props) => <div> {formatAsAmount(props.value)}</div>,
    sortType: "basic",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: (props) => <div> {formatAsCurrency(props.value)}</div>,
    sortType: "basic",
  },
  {
    Header: "Value",
    accessor: "value",
    Cell: (props) => <div> {formatAsCurrency(props.value)}</div>,
    sortType: "basic",
  },
  {
    Header: "Date",
    accessor: "date",
  },
];

export const TRADES_TABLE_COLS = [
  {
    Header: "Trade ID",
    accessor: "tradeId",
  },
  {
    Header: "Asset ID",
    accessor: "assetId",
  },
  {
    Header: "Ticker",
    accessor: "ticker",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "# of Shares",
    accessor: "numShares",
    Cell: (props) => <div> {formatAsAmount(props.value)}</div>,
    sortType: "basic",
  },
  {
    Header: "Price",
    accessor: "price",
    Cell: (props) => <div> {formatAsCurrency(props.value)}</div>,
    sortType: "basic",
  },
  {
    Header: "Total Price",
    accessor: "total_price",
    Cell: (props) => <div> {formatAsCurrency(props.value)}</div>,
    sortType: "basic",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Trade Time",
    accessor: "time",
  },
];

export const RISK_SNAPSHOT_GVT_OPTIONS = [
  { value: 0, label: "Bar Chart for Top 10 Stocks by Risk" },
  {
    value: 1,
    label: "Bar Chart for Top 10 Stocks by Partial Contribution to Risk",
  },
  { value: 2, label: "Bar Chart for Top 10 Stocks by Contribution to Risk" },
  { value: 3, label: "Bar Chart for Top 10 Industries by Risk" },
  {
    value: 4,
    label: "Bar Chart for Top 10 Industries by Partial Contribution to Risk",
  },
  {
    value: 5,
    label: "Bar Chart for Top 10 Industries by Contribution to Risk",
  },
  { value: 6, label: "Bar Chart of All Style Exposures" },
  { value: 7, label: "Bar Chart of Risk for Each Style Factor" },
  {
    value: 8,
    label: "Bar Chart for Partial Contribution to by Style Factor",
  },
  { value: 9, label: "Bar Chart for Contribution to Risk by Style Factor" },
];

export const RISK_THROUGHTIME_GVT_OPTIONS = [
  { value: 0, label: "Ex-Ante Risk" },
  { value: 1, label: "Realized Risk" },
  { value: 2, label: "Ex-Ante vs. Realized Risk" },
  { value: 3, label: "Ex-Ante Beta to Benchmark" },
  { value: 4, label: "Realized Beta to Benchmark" },
  { value: 5, label: "Ex-Ante vs. Realized Beta to Benchmark" },
  {
    value: 6,
    label: "Portfolio Diversification Coefficient",
    disabled: true,
  },
  {
    value: 7,
    label: "Exposures to Style Factors 1 through K",
    disabled: true,
  },
  { value: 8, label: "Ex-Ante Partial Contribution to Risk", disabled: true },
  {
    value: 9,
    label: "Realized Partial Contribution to Risk",
    disabled: true,
  },
  { value: 10, label: "Ex-Ante Contribution to Risk", disabled: true },
  { value: 11, label: "Realized Contribution to Risk", disabled: true },
];
