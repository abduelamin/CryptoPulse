import { Box, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FireBase";

const Login = ({ handleClose, alert, setAlert }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: "Login successful",
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: "Invalid email or password",
        type: "error",
      });
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
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#3498db" }}
        onClick={handleSubmit}
      >
        Log In
      </Button>

      <Alert alert={alert} setAlert={setAlert} />
    </Box>
  );
};

export default Login;
