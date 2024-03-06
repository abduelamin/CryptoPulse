import { Box, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FireBase";

const CreateAccount = ({ handleClose, alert, setAlert }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
    } else {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        setAlert({
          open: true,
          message: `Sign Up Successful, Welcome ${result.user.email}`,
          type: "success",
        });
      } catch (error) {
        console.error("Signup Error:", error);
        setAlert({
          open: true,
          message: "Sign Up failed. Please try again.",
          type: "error",
        });
      }
    }
  };

  // Use useEffect to delay modal closure until after state update
  useEffect(() => {
    if (alert.open && alert.type === "success") {
      // If it's a success alert, close the modal after a delay
      const delay = 3000;
      const timeoutId = setTimeout(() => {
        handleClose();
      }, delay);

      return () => {
        clearTimeout(timeoutId);
        // Reset alert state when the component unmounts
        setAlert({ open: false, message: "", type: "" });
      };
    }
  }, [alert, handleClose, setAlert]);

  return (
    <Box
      style={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC10" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
      <Alert alert={alert} setAlert={setAlert} />
    </Box>
  );
};

export default CreateAccount;
