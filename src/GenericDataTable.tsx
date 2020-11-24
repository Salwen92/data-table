import {
  Checkbox,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow as MuiTableRow,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import React from "react";
import styled from "styled-components";
import { TableHead } from "./Components/TableHead";
import { TableToolbar } from "./Components/Toolbar";

import {
  createRowCells,
  filterAllColumns,
  getComparator,
  searchFn,
  stableSort,
} from "./utilities";
import { Chip as MuiChip } from "@material-ui/core";
import { IGenericDataTable, ChipData } from "./types";

const Paper = styled(MuiPaper)(spacing);
const ChipDiv = styled.div`
  display: "flex";
  justify-content: "left";
  flex-wrap: "wrap";
  list-style: "none";
  padding: "5px";
  margin: 0;
`;
const Chip = styled(MuiChip)(spacing);
const TableRow = styled(MuiTableRow)`
  &:hover {
    cursor: pointer;
  }
`;

// interface ItableRow {
//     isHighlited: boolean
// }

// const TableRow = styled(MuiTableRow)<ItableRow>`
//     background-color: ${p => (p.isHighlited ? '#a55b6b' : 'inherit')};
// `
export default function GenericDataTable({
  data,
  columns,
  pagination,
  toolbarOptions,
  onRowClick,
  onRowDelete,
}: IGenericDataTable) {
  const [order, setOrder] = React.useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = React.useState("customer");
  const [selected, setSelected] = React.useState<Array<string>>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchText, setsearchtext] = React.useState("");
  const [openDropDownMenu, setOpenDropDownMenu] = React.useState(false);
  const [columnChecked, setColumnChecked] = React.useState(
    columns
      .filter((col) => (col.visible !== undefined ? col.visible : true))
      .map((col) => {
        return { label: col.label, checked: true };
      })
  );

  const [filterProps, setFilterProps] = React.useState(
    columns
      .filter((col) => col.filterable !== undefined && col.filterable)
      .map((col) => {
        return { name: col.name, value: "", label: col.label };
      })
  );

  const columnCheckedtoArray = columnChecked.map((c) => {
    if (c.checked) return c.label;
  });

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows = pagination
    ? rowsPerPage - data.length
    : rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  function updateSearchText(searchText: string) {
    setsearchtext(searchText);
  }

  const handleSearch = (searchText: string, data: any, remote?: boolean) => {
    if (searchText) {
      if (remote) {
        if (toolbarOptions?.searchRemote)
          return toolbarOptions.searchRemote(searchText, data);
      } else return searchFn(searchText, data, columns);
    } else return data;
  };

  function ToggleCloseDropDownMenu() {
    setOpenDropDownMenu(!openDropDownMenu);
  }

  const handleToggleCheck = (e: any) => () => {
    const currentIndex = columnChecked.indexOf(e);

    const newChecked = [...columnChecked];
    newChecked[currentIndex].checked = !newChecked[currentIndex].checked;
    setColumnChecked(newChecked);
  };

  const handleClick = (event: any, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: Array<string> = [];
    console.log(selected, "___", selectedIndex);
    if (toolbarOptions?.selection === "multiple") {
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    } else {
      newSelected = [id];
      if (selectedIndex === 0) {
        return setSelected([]);
      }
      return setSelected(newSelected);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds: Array<string> = data.map((row: any) => row[isKey]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    if (pagination?.handleRemotePagination)
      pagination.handleRemotePagination(newPage, -1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    if (pagination?.handleRemotePagination)
      pagination.handleRemotePagination(-1, parseInt(event.target.value));
  };
  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const dataAfterPagingSortingSearchingFiltering = () => {
    const result = stableSort(
      filterByColumns(
        filterProps,
        handleSearch(searchText, data, toolbarOptions?.remote)
      ),
      getComparator(order, orderBy)
    );

    if (!pagination?.handleRemotePagination) {
      return result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }

    return result.slice(0, rowsPerPage);
  };

  const tableAllRows = () => {
    return dataAfterPagingSortingSearchingFiltering().map((row: any) => {
      const isItemSelected = isSelected(row[isKey]);

      return (
        <TableRow
          hover
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row[isKey]}
          selected={isItemSelected}
          onClick={(event) => {
            onRowClick !== undefined && onRowClick(row);
            handleClick(event, row[isKey]);
          }}
        >
          {toolbarOptions?.checkBox ? (
            <TableCell padding="checkbox">
              <Checkbox
                checked={isItemSelected}
                onClick={(event) => handleClick(event, row[isKey])}
              />
            </TableCell>
          ) : null}

          {createRowCells(
            columns.filter(
              (col) => columnCheckedtoArray.indexOf(col.label) + 1
            ),
            row
          )}
        </TableRow>
      );
    });
  };

  //filter
  const onChangeFilterValue = (value: string, column: string) => {
    setFilterProps(
      filterProps.map((f) => {
        return f.name === column ? ((f.value = value), f) : f;
      })
    );
    setChipData(
      filterProps
        .filter((f) => f.value !== "")
        .map((col) => {
          return { key: col.name, label: col.label };
        })
    );
  };

  const filterByColumns = (
    filterProps: {
      name: string;
      value: string;
    }[],
    data: any
  ) => {
    const filter = filterProps.filter((f) => f.value !== "");

    if (filter.length > 0) {
      return filterAllColumns(filterProps, data);
    } else return data;
  };
  const [chipData, setChipData] = React.useState<ChipData[]>([]);
  const handleDeleteChip = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );

    setFilterProps(
      filterProps.map((f) =>
        f.label === chipToDelete.label ? ((f.value = ""), f) : f
      )
    );
  };

  const filterChips = (
    <ChipDiv
      style={{
        display: "flex",
        justifyContent: "left",
        flexWrap: "wrap",
        listStyle: "none",
        padding: "5px",
        margin: 0,
      }}
    >
      {chipData.map((data) => (
        <li key={data.key}>
          <Chip
            label={data.label}
            onDelete={handleDeleteChip(data)}
            style={{ margin: "3px" }}
            size="small"
          />
        </li>
      ))}
    </ChipDiv>
  );

  // const onDelete = () => {
  //     console.log('items to delete', selected)
  // }

  let isKey = "";
  for (let index = 0; index < columns.length; index++) {
    if (columns[index].isKey) {
      isKey = columns[index].name;
      break;
    }
  }

  return (
    <Paper>
      <TableToolbar
        selected={selected}
        isLoading={pagination?.isLoading}
        title={toolbarOptions?.title}
        searchText={searchText}
        updateSearchText={updateSearchText}
        ToggleCloseDropDownMenu={ToggleCloseDropDownMenu}
        columnChecked={columnChecked}
        handleToggleCheck={handleToggleCheck}
        toolbarCustomItems={toolbarOptions?.toolbarCustomItems}
        columns={columns}
        onChangeFilterValue={onChangeFilterValue}
        onDelete={onRowDelete}
      />
      {filterChips}
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size={"medium"}
          aria-label="enhanced table"
        >
          <TableHead
            toolbarOptions={toolbarOptions}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            columns={columns.filter(
              (col) => columnCheckedtoArray.indexOf(col.label) + 1
            )}
            columnChecked={columnChecked}
          />
          <TableBody>
            {tableAllRows()}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={pagination?.count ? pagination.count : data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
