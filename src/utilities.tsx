import { TableCell } from "@material-ui/core";
import React from "react";
import { Order, IColumn } from "./types";

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const createRowCells: any = (columns: IColumn[], row: any) =>
  columns
    .filter((col: IColumn) => (col.visible !== undefined ? col.visible : true))
    .map((column: IColumn) => (
      <TableCell
        key={column.name}
        align={column.alignment ? column.alignment : undefined}
      >
        {column.format ? column.format(row[column.name]) : row[column.name]}
      </TableCell>
    ));

export const searchFn = (searchText: string, data: any, columns: any) => {
  return data.filter((row: any) => {
    let isFinded = false;
    columns.forEach((col: any) => {
      if (
        new String(row[col.name])
          .valueOf()
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
        isFinded = true;
    });

    return isFinded;
  });
};
export const filterAllColumns = (
  filter: {
    name: string;
    value: string;
  }[],
  data: any
) => {
  return data.filter((row: any) => {
    for (let index = 0; index < filter.length; index++) {
      if (
        filter[index].value !== "" &&
        !new String(row[filter[index].name])
          .valueOf()
          .toLowerCase()
          .includes(filter[index].value.toLowerCase())
      )
        return false;
    }
    return true;
  });
};
