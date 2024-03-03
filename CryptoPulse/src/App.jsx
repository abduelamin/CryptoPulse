import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import CoinCard from "./Components/CoinCard";
import WatchList from "./Components/WatchList";
import AssetPage from "./Components/AssetPage";
import useFetch from "./Components/useFetch";
import SearchedCoin from "./Components/SearchedCoin";
import HomePage from "./Components/HomePage";

function App() {
  const navigateToAsset = useNavigate();
  // this is for coincard logic
  const [search, setSearch] = useState("");
  const initialURL =
    "https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=20&order=market_cap_desc";
  const [API, setAPI] = useState(initialURL);
  // const { loading, cryptoData } = useFetch(API);

  // this is for the searched coin comp logic
  const [coinSearch, setCoinSearch] = useState("");
  const [url, setUrl] = useState("");
  const [singleLoading, setSingleLoading] = useState(false);

  // This fethces data for the searched coin
  const searchURL = (searchedItem) => {
    setUrl(`https://api.coingecko.com/api/v3/coins/${searchedItem}`);
  };

  const formatMarketCap = (marketCap) => {
    const billion = 1e9;
    const million = 1e6;

    if (marketCap >= billion) {
      return (marketCap / billion).toFixed(2) + "B";
    } else if (marketCap >= million) {
      return (marketCap / million).toFixed(2) + "M";
    } else {
      return marketCap.toFixed(2);
    }
  };

  const handleCardClick = (param) => {
    navigateToAsset(`/asset/${param}`);
  };

  // THIS FUNCTION ^^ IS WHAT WILL TAKE THE USER TO THE ASSET PAGE - YOU WILL NEED TO PROBABLY PASS A PARAMTER AND SO WHEN THE USER CLICKS ON IT, IT SENDS THE ID AS THE ARGUMENT HENCE DIPLSAYING THAT
  return (
    <div className="appContainer">
      <Header
        search={search}
        setSearch={setSearch}
        searchURL={searchURL}
        setAPI={setAPI}
        setCoinSearch={setCoinSearch}
        handleCardClick={handleCardClick}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchURL={searchURL}
              setSingleLoading={setSingleLoading}
              setCoinSearch={setCoinSearch}
              url={url}
              coinSearch={coinSearch}
              API={API}
              singleLoading={singleLoading}
              handleCardClick={handleCardClick}
              formatMarketCap={formatMarketCap}
            />
          }
        />
        <Route
          path="/asset/:id"
          element={
            <AssetPage
              setSingleLoading={setSingleLoading}
              singleLoading={singleLoading}
              formatMarketCap={formatMarketCap}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

/* 
Pseudocode:



Advanced features:
** I want the user to register and login ** 
** I want a portfolio tracker for the user CRUD their own coins and profit/loss is shown based on real time price movement
*/
