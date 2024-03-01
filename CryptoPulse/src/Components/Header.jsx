import React, { useState } from "react";
import "../styles/Header.css";

const Header = ({ search, setSearch, searchURL, setAPI }) => {
  const [status, setStatus] = useState("offline"); // This will change if the user is logged on. So I will pass a function that will setStatus once the user is logged in. - You may need to add this to add.jsx because You'll wnat to detect status change somehow and then change this feature.
  const handleSubmit = (e) => {
    e.preventDefault();
    const onlyLetters = /^[A-Za-z]+$/;
    if (!onlyLetters.test(search)) {
      const warningMessage = document.createElement("dialog");
      warningMessage.textContent =
        "The Coin You Are Looking For Does Not Exist";
      document.body.append(warningMessage);
    } else {
      if (search.trim() === "") {
        setAPI(
          "https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=20&order=market_cap_desc"
        );
      } else {
        searchURL(search);
      }
    }
  };
  return (
    <header>
      <h1>Crypto Pulse</h1>
      <div className="headerContainer">
        <form onSubmit={handleSubmit} className="searchForm">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            required
          />
          <button type="submit">Click Me</button>
        </form>
        <nav>
          {status === "online" ? (
            <h5>Log Out</h5>
          ) : (
            <>
              <h5>Create Account</h5> <h5>Login</h5>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
