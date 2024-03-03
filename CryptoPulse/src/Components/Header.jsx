import React, { useState } from "react";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";
import useModal from "./useModal";

const Header = ({ search, setSearch, searchURL, setAPI, setCoinSearch }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("offline"); // This will change if the user is logged on. So I will pass a function that will setStatus once the user is logged in. - You may need to add this to add.jsx because You'll wnat to detect status change somehow and then change this feature.
  const handleSubmit = (e) => {
    e.preventDefault();

    const { openModal } = useModal();

    // This modal logic has been passed into

    // This is the regexp and the test method in action.
    const onlyLetters = /^[A-Za-z]+$/;
    const testedInput = onlyLetters.test(search);
    if (testedInput === false) {
      openModal(); // Call the function to open the modal
    }

    if (search.trim() === "") {
      setAPI(
        "https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=20&order=market_cap_desc"
      );
    } else {
      searchURL(search);
    }

    setSearch("");
    navigate("/"); // This solely for the purpose of when the user is inside the asset detail page and they search something. so on submit it goes back to the homepage which will render their searched it
  };
  return (
    <header>
      <h1
        onClick={() => {
          setCoinSearch("");
          navigate("/");
        }}
      >
        Crypto Pulse
      </h1>
      <br />
      <br />
      <h4 style={{ fontSize: "1.2rem", color: "#007BFF", lineHeight: "1.5" }}>
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
