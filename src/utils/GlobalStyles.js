import { createGlobalStyle } from "styled-components";
import { COLORS } from "./constants";

const GlobalStyles = createGlobalStyle`
 html,
body {
  background-color: ${COLORS.navy};
  color: ${COLORS.white};
  font-family: Roboto, Helvetica, Arial;
}

hr {
  background-color: ${COLORS.navy};
}

p {
  font-family: sans-serif;
}

a {
  color: slategray;
}

a :hover {
  color: darkslategray;
}

.btn {
  background-color: ${COLORS.navy};
  color: ${COLORS.white};
  font-size: 20px;
  letter-spacing: 0.4px;
  font-weight: 400;
  border-radius: 8px;
}
.btn:hover {
  background-color: ${COLORS.black};
  color: ${COLORS.white};
}

.black-btn {
  background-color: ${COLORS.black};
}
.black-btn:hover {
  background-color: ${COLORS.navy};
}

.white-btn {
  background-color: ${COLORS.white};
  color: ${COLORS.black};
}
.white-btn:hover {
  background-color: #ebebeb;
  color: ${COLORS.black};
}

.signout-btn {
  font-weight: 500;
}

.sub-pane {
  background-color: rgba(207, 207, 207, 0.3);
}

.pane a,
.sub-pane a {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  font-size: large;
  letter-spacing: 0.4px;
}

.sub-pane a {
  font-size: medium;
  letter-spacing: 0.2px;
}

.pane a:hover,
.sub-pane a:hover {
  background-color: rgba(207, 207, 207, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

table {
  border-collapse: collapse;
  overflow: hidden;
  border: 5px solid #cfcfcf;
  border-radius: 15px;
  width: 100%;
}

.table-with-select {
  overflow: visible;
}

th,
td {
  border: 4px solid #cfcfcf;
  padding: 5px;
  text-align: right;
  padding-left: 1em;
  padding-right: 1em;
}

th {
  background-color: ${COLORS.navy};
  color: ${COLORS.white};
}

td {
  background-color: ${COLORS.white};
}

.sortable-table-col:hover {
  background-color: #3f5f80;
}

.delete-table-row-btn:hover {
  background-color: #970000;
}

.top-right-cell {
  border-top-right-radius: 18px;
}

.top-left-cell {
  border-top-left-radius: 18px;
}

.btm-left-cell {
  border-bottom-left-radius: 18px;
}

.btm-right-cell {
  border-bottom-right-radius: 18px;
}

.blank-cell {
  background-color: #e4e4e4;
}

`;

export default GlobalStyles;
