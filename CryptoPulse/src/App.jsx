import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import CoinCard from "./Components/CoinCard";
import WatchList from "./Components/WatchList";
import AssetPage from "./Components/AssetPage";
import TableHeading from "./Components/TableHeading";

function App() {
  const [search, setSearch] = useState("");
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const url =
      "https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=20&order=market_cap_desc";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "caa0b747e0mshc869274a8f77de6p125aa0jsn9f3f6ee2b9a8",
        "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
      },
    };

    const fetchCrptoData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        setCryptoData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCrptoData();
  }, []);

  return (
    <div className="appContainer">
      <Header search={search} setSearch={setSearch} />
      <section className="displaySection">
        {cryptoData.map((crypto) => {
          return <CoinCard key={crypto.name} crypto={crypto} />;
        })}{" "}
      </section>
    </div>
  );
}

export default App;

/* 
Pseudocode:

- I want the user to see the top 20 crypto coins using the coinGecko API
- I want the user to click 'see more' at the bottom of the page to see more assets

- When the user clicks on the asset it will bring them to a new page (useNavigate) 


Advanced features:
** I want the user to register and login ** 
** I want a portfolio tracker for the user CRUD their own coins and profit/loss is shown based on real time price movement


*/

/* 

card component:

This must have several divs 

<div className="cardHolder">
        
            
            <div className="rankHolder" ></div>

            <div className="nameHolder"></div>
            <div className="priceHolder"></div>
            <div className="24hrPriceChangeHolder"></div>
            <div className="volumeHolder"></div>
            <div className="mktCapHolder"></div>

         
</div>    
  
      

*/
