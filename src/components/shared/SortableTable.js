import React from "react";
import { useTable, useSortBy } from "react-table";

import LoadingSpinner from "./LoadingSpinner";

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
                  <th
                    className="sortable-table-col"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <span style={{ paddingLeft: "10px", float: "right" }}>
                            ▼
                          </span>
                        ) : (
                          <span style={{ paddingLeft: "10px", float: "right" }}>
                            ▲
                          </span>
                        )
                      ) : null}
                    </span>
                  </th>
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
