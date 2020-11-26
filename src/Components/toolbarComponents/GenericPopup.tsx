import { IconButton, Tooltip } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import { ToolbarFilter } from "../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //backgroundColor: "#303030",
    },
    typography: {
      padding: theme.spacing(2),
    },
    form: {
      margin: theme.spacing(2),
      width: "300px",
      padding: "10px 16px 30px",
    },
  })
);

export default function GenericPopup(props: ToolbarFilter) {
  const { items, icon } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const check = items.props.children.filter((c: any) => c !== undefined);

  return (
    <>
      {check[0] !== undefined && (
        <>
          <Tooltip title="Filter">
            <IconButton aria-label="Filter list" onClick={handleClick}>
              {icon}
            </IconButton>
          </Tooltip>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div className={classes.root}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle2" style={{ padding: "12px" }}>
                  Filter
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>

              <form noValidate autoComplete="off" className={classes.form}>
                {items}
              </form>
            </div>
          </Popover>
        </>
      )}
    </>
  );
}
