import React from "react";
import "../styles/Header.css";

const Header = ({ search, setSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
          />
          <button type="submit">Click Me</button>
        </form>
        <nav>
          <h5>Create Account</h5>
          <h5>Login</h5>
        </nav>
      </div>
    </header>
  );
};

export default Header;

// https://creativeresource.co.uk/images/submit.svg?e666110d541bfaae59561245ffdd803b  -- give credit to this source for using their image
