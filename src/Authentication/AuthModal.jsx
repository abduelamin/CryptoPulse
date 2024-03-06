import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AppBar, Tab, Tabs } from "@mui/material";
import Login from "../Components/Login";
import CreateAccount from "../Components/CreateAccount";
import { useEffect } from "react";
import "../styles/AuthModal.css";
// AuthModal.jsx
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  backgroundColor: "#EEDDCC",
  color: "white",
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

const AuthModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    type: "Success",
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!open) {
      setAlert({ open: false, message: "", type: "" }); // Resets alert state
    }
  }, [open, setAlert]);
  return (
    <div>
      <Button
        variant="contained"
        style={{ width: 85, height: 29 }}
        onClick={handleOpen}
      >
        LogIn
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div style={style}>
            <AppBar
              position="static"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>

            {value === 0 && (
              <Login
                handleClose={handleClose}
                alert={alert}
                setAlert={setAlert}
              />
            )}
            {value === 1 && (
              <CreateAccount
                handleClose={handleClose}
                alert={alert}
                setAlert={setAlert}
              />
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
