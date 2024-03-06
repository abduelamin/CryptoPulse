import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import WatchList from "../Components/WatchList";
import "../styles/UserSidebar.css";
import { signOut } from "firebase/auth";
import { auth } from "../Components/FireBase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../Components/FireBase";

export default function UserSidebar({
  user,
  watchlist,
  setWatchlist,
  coin,
  setCoin,
}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    signOut(auth);
    toggleDrawer(false)();
  };

  const removeFromWatchlist = (itemToRemove) => {
    const updatedWatchlist = watchlist.filter((item) => item !== itemToRemove);
    setWatchlist(updatedWatchlist);

    // Update the Firestore database
    const userWatchlistRef = doc(db, "WatchList", user.uid);
    setDoc(userWatchlistRef, { coins: updatedWatchlist }, { merge: true });
  };

  return (
    <div>
      <Avatar
        onClick={toggleDrawer(true)}
        style={{
          height: 60,
          width: 60,
          marginLeft: 15,
          cursor: "pointer",
          backgroundColor: "#EEBC1D",
        }}
        src={user.photoURL}
        alt={user.displayName || user.email}
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div
          style={{
            width: 300,
            padding: 25,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            fontFamily: "sans-serif",
            backgroundColor: "#2C3E50",
            color: "#ECF0F1",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              height: "40%",
            }}
          >
            <Avatar
              onClick={toggleDrawer(true)}
              style={{
                height: "13vh",
                width: "8vw",
                marginLeft: 15,
                cursor: "pointer",
                backgroundColor: "#3498DB",
              }}
              src={user.photoURL}
              alt={user.displayName || user.email}
            />
            <span
              style={{
                width: "100%",
                fontSize: 18,
                textAlign: "center",
                fontWeight: "bolder",
                wordWrap: "break-word",
              }}
            >
              {user.displayName || user.email}
            </span>
          </div>
          <div className="watchlist">
            <span
              style={{
                fontSize: 18,
                textShadow: "0 0 1px black",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              My WatchList
            </span>
            <div className="watchListCardHolder">
              {watchlist.map((watchListItem, index) => (
                <div key={index} className="watchListCard">
                  <span style={{ textTransform: "capitalize" }}>
                    {watchListItem}
                  </span>
                  <button
                    onClick={() => removeFromWatchlist(watchListItem)}
                    style={{
                      backgroundColor: "#E74C3C",
                      color: "#ECF0F1",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
              height: "50%",
            }}
          >
            <Button
              variant="contained"
              onClick={handleLogout}
              style={{
                height: "8vh",
                width: "100%",
                cursor: "pointer",
                backgroundColor: "#3498DB",
              }}
            >
              LOG OUT
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
