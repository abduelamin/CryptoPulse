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

  // useEffect(() => {
  //   const newController = new AbortController();
  //   const signal = newController.signal;

  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "caa0b747e0mshc869274a8f77de6p125aa0jsn9f3f6ee2b9a8",
  //       "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
  //     },
  //   };

  //   const fetchSearch = async () => {
  //     try {
  //       const response = await fetch(url, options, { signal });
  //       setSingleLoading(true);

  //       if (!response.ok) {
  //         throw new Error("Crypto Data Could Not Be Fetched");
  //       } else {
  //         const result = await response.json();
  //         console.log(result.symbol.toUpperCase());
  //         setCoinSearch(result);
  //         // console.log(coinSearch);
  //       }
  //     } catch (error) {
  //       error.name === "AbortError"
  //         ? console.error("Fetch aborted")
  //         : console.error(error.message);
  //     } finally {
  //       setSingleLoading(false);
  //     }
  //   };

  //   if (url) {
  //     fetchSearch();
  //   }

  //   return () => {
  //     newController.abort();
  //   };
  // }, [url]);

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
            />
          }
        />
        <Route
          path="/asset/:id"
          element={
            <AssetPage
              setSingleLoading={setSingleLoading}
              singleLoading={singleLoading}
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
