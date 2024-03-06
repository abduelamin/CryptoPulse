import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = ({ alert, setAlert }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (setAlert) {
      setAlert({ ...alert, open: false });
    }
  };

  useEffect(() => {}, [alert]);

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
