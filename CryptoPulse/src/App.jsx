import React, { useState } from "react";
import "./App.css";
import { Route, Routes, NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import CoinCard from "./Components/CoinCard";
import WatchList from "./Components/WatchList";
import AssetPage from "./Components/AssetPage";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="appContainer">
      <Header search={search} setSearch={setSearch} />

      <div className="cardHolder">
        <div className="rankHolder"></div>
        <div className="nameHolder"></div>
        <div className="priceHolder"></div>
        <div className="24hrPriceChangeHolder"></div>
        <div className="volumeHolder"></div>
        <div className="mktCapHolder"></div>
      </div>
    </div>
  );
}

export default App;

/* 

Primary Color: Deep Blue
Hex: #0B3D91
This deep blue provides a sophisticated and calming base for your application.

Accent Color: Electric Green
Hex: #00FF9B
A vibrant green can be used for call-to-action buttons or to highlight important information.
Background: Light Gray

Hex: #F5F5F5
A light gray background creates a clean and modern look, making content easy to read.
Text Color: Charcoal Gray

Hex: #333333
Dark charcoal gray is easy on the eyes and provides good contrast with the background.
Highlight Color: Gold

Hex: #FFD700
Use gold for subtle highlights or to bring attention to specific elements.*/
