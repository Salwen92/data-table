import {
  createStyles,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Switch,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { FilterList as FilterListIcon } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import React from "react";
import styled from "styled-components";
import { ITableToolbar } from "../types";

import GenericPopup from "./Toolbar/GenericPopup";
import { SearchTextInput } from "./Toolbar/SearchTextInput";

const ToolbarTitle = styled.div`
  min-width: 150px;
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Input: {
      display: "flex",
      justifyContent: "left",
      flexWrap: "wrap",
      margin: "0px 6px 10px 6px",
    },
  })
);
export const TableToolbar = (props: ITableToolbar) => {
  const {
    selected,
    isLoading,
    title,
    searchText,
    updateSearchText,
    columnChecked,
    handleToggleCheck,
    toolbarCustomItems,
    columns,
    onChangeFilterValue,
    onDelete,
  } = props;

  const classes = useStyles();
  const filteritems = (
    <>
      {columns.map((col) => {
        if (col.filterable)
          return (
            <FormControl className={classes.Input} key={col.name}>
              <InputLabel>Filter by {col.label}</InputLabel>
              <Input
                onChange={(e) => onChangeFilterValue(e.target.value, col.name)}
                key={col.name}
              />
            </FormControl>
          );
      })}
    </>
  );
  const hideItems = (
    <List style={{ minWidth: "300px" }}>
      {columnChecked.map((col) => (
        <ListItem key={col.label} id={col.label}>
          <ListItemText primary={col.label} />
          <ListItemSecondaryAction>
            <Switch
              edge="start"
              onChange={handleToggleCheck(col)}
              checked={col.checked}
              size="small"
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
  return (
    <>
      {isLoading && <LinearProgress style={{ height: "3px" }} />}
      {/* <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                
            </div> */}

      <Toolbar>
        <ToolbarTitle>
          {selected.length > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {/* {selected.length} selected */}
            </Typography>
          ) : (
            <>
              <Typography variant="h6" id="tableTitle">
                {title ? title : "DataTable"}
              </Typography>
            </>
          )}
        </ToolbarTitle>

        <div
          style={{
            flex: "1 0",
            textAlign: "right",
          }}
        >
          {toolbarCustomItems}

          <SearchTextInput
            searchText={searchText}
            updateSearchText={updateSearchText}
          />
        </div>

        <GenericPopup
          columns={columnChecked}
          items={hideItems}
          icon={<ViewColumnIcon />}
        />

        {selected.length > 0 ? (
          onDelete !== undefined && (
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete"
                onClick={(e) => onDelete(selected)}
              >
                <DeleteIcon color="secondary" />
              </IconButton>
            </Tooltip>
          )
        ) : (
          <GenericPopup
            columns={columns}
            items={filteritems}
            icon={<FilterListIcon />}
          />
        )}
      </Toolbar>
    </>
  );
};
