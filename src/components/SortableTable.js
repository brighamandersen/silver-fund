import React from "react";
import PropTypes from "prop-types";
import { useTable, useSortBy } from "react-table";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import { COLORS } from "../utils/constants";

const TH = styled.th`
  &:hover {
    background: ${COLORS.fadeNavy};
  }
`;

const SortArrow = styled.span`
  padding-left: 10px;
  float: right;
`;

const SortableTable = (props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: props.tableColumns,
        data: props.tableData,
        initialState: {
          sortBy: [{ id: props.initialSort, desc: true }],
        },
      },
      useSortBy
    );

  return (
    <div>
      {props.tableData && props.tableData.length > 0 ? (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TH {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <SortArrow>▼</SortArrow>
                        ) : (
                          <SortArrow>▲</SortArrow>
                        )
                      ) : null}
                    </span>
                  </TH>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

SortableTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableColumns: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
  initialSort: PropTypes.string,
};

SortableTable.defaultProps = {
  initialSort: "date",
};

export default SortableTable;
