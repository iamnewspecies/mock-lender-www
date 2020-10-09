import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "hsl(210, 100%, 97%)",
    height: "100vh",
    padding: 100,
    overflow: "hidden",
    overflowY: "auto",
  },
  header: {
    textAlign: "center",
  },
  contentContainer: {
    borderRadius: 16,
    backgroundColor: "hsl(120, 100%, 100%)",
    boxShadow: "2px 2px 10px 0px #ccc",
    padding: 20,
    "@media (max-width: 600px)": {
      width: "100%",
    },
    "@media (min-width: 600px)": {
      width: "500px",
    },
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  root: {
    "& > *": {
      margin: theme.spacing(2),
      //   width: "25ch",
    },
  },
}));

export function ButtonsContainer({ children }) {
  const classes = useStyles();
  return <div class={classes.buttonContainer}>{children}</div>;
}

export function FormContainer({ children }) {
  const classes = useStyles();
  return (
    <div class={classes.container}>
      <Box borderRadius={16} class={classes.contentContainer}>
        {children}
      </Box>
    </div>
  );
}
