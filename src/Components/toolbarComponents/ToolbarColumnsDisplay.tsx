import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import * as React from "react";
import { ToolbarColumnDisplayType } from "../../types";

export const ToolbarColumnsDisplay = (props: ToolbarColumnDisplayType) => {
  const { columnChecked, handleToggleCheck } = props;

  return (
    <List style={{ minWidth: "300px" }}>
      {columnChecked.map((col) => (
        <ListItem key={col.label} id={col.label}>
          <ListItemText primary={col.label} />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={handleToggleCheck(col)}
              checked={col.checked}
              size="small"
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
