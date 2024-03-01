import React, { useState } from "react";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ search, setSearch, searchURL, setAPI, setCoinSearch }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("offline"); // This will change if the user is logged on. So I will pass a function that will setStatus once the user is logged in. - You may need to add this to add.jsx because You'll wnat to detect status change somehow and then change this feature.
  const handleSubmit = (e) => {
    e.preventDefault();

    //handles errors based on user not typing a word
    const openModal = () => {
      const modalContainer = document.createElement("div");
      modalContainer.className = "modal-container";

      const modalContent = document.createElement("div");
      modalContent.className = "modal-content";
      modalContent.textContent = "The Coin You Are Looking For Does Not Exist";

      const closeButton = document.createElement("button");
      closeButton.className = "modal-button";
      closeButton.textContent = "Close";
      closeButton.addEventListener("click", () => {
        document.body.removeChild(modalContainer);
      });

      modalContent.appendChild(closeButton);
      modalContainer.appendChild(modalContent);
      document.body.appendChild(modalContainer);
    };

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
  };
  return (
    <header>
      <h1
        onClick={() => {
          navigate("/");
          setCoinSearch("");
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
