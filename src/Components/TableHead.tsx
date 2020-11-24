import {
  Checkbox,
  TableCell,
  TableHead as Head,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React from "react";
import { IColumn, TableHeadPropsType } from "../types";

export const TableHead: React.FC<TableHeadPropsType> = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
    toolbarOptions,
  } = props;

  const createSortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <Head>
      <TableRow>
        {toolbarOptions?.checkBox ? (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all" }}
            />
          </TableCell>
        ) : null}

        {columns
          .filter((col: IColumn) =>
            col.visible !== undefined ? col.visible : true
          )
          .map((column: IColumn) => (
            <TableCell
              key={column.name}
              align={column.alignment}
              padding={column.disablePadding ? "none" : "default"}
              sortDirection={orderBy === column.name ? order : false}
            >
              <TableSortLabel
                active={orderBy === column.name}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </Head>
  );
};
