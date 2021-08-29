import React from "react";
import { useTable, useSortBy } from "react-table";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const TH = styled.th`
  &:hover {
    background: #3f5f80;
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

export default SortableTable;
