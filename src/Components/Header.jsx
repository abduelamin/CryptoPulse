import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import useModal from "./useModal";
import Gainers from "./Gainers";
import AuthModal from "../Authentication/AuthModal";
import Alert from "./Alert";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBase";
import UserSidebar from "../Authentication/UserSidebar";
import logo from "../assets/crypto-pulse-favicon-color.png";

const Header = ({
  search,
  setSearch,
  searchURL,
  setAPI,
  setCoinSearch,
  user,
  setuser,
  watchlist,
  setWatchlist,
  coin,
  setCoin,
}) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("offline"); // This will change if the user is logged on. So I will pass a function that will setStatus once the user is logged in. - You may need to add this to add.jsx because You'll wnat to detect status change somehow and then change this feature.
  const handleSubmit = (e) => {
    e.preventDefault();

    const { openModal } = useModal();

    // This is the regexp and the test method in action.
    const onlyLetters = /^[A-Za-z]+$/;
    const testedInput = onlyLetters.test(search);
    if (testedInput === false) {
      openModal();
    }

    if (search.trim() === "") {
      setAPI(
        "https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=20&order=market_cap_desc"
      );
    } else {
      searchURL(search.toLowerCase());
    }

    setSearch("");
    navigate("/"); // This solely for the purpose of when the user is inside the asset detail page and they search something. so on submit it goes back to the homepage which will render their searched it
  };
  return (
    <header>
      <h1
        onClick={() => {
          setCoinSearch(""); // This is supposed to set thecoinsearh to falsey and stop the asset rendering.
          navigate("/");
        }}
      >
        Crypto Pulse <img src={logo} alt="brand logo" />
      </h1>

      <br />
      <br />
      <h4 className="slogan">
        Stay Informed, Act Swiftly - Your Gateway to Real-Time Updates in the
        Crypto Universe!
      </h4>
      <br />
      <br />
      <div className="headerContainer">
        <form onSubmit={handleSubmit} className="searchForm">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button type="submit" onClick={handleSubmit}>
            Search
          </button>
        </form>
        <nav>
          {status === "online" ? (
            <h5>Log Out</h5>
          ) : (
            <>
              {user ? (
                <UserSidebar
                  user={user}
                  watchlist={watchlist}
                  setWatchlist={setWatchlist}
                  coin={coin}
                  setCoin={setCoin}
                />
              ) : (
                <AuthModal user={user} />
              )}
            </>
          )}
        </nav>
      </div>
      <Gainers />
    </header>
  );
};

export default Header;
