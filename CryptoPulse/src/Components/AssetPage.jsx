import React, { useEffect, useState } from "react";
import "../styles/AssetPage.css";
import { useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import HomePage from "./HomePage";
import Chart from "./Chart";

const AssetPage = ({ singleLoading, setSingleLoading, formatMarketCap }) => {
  const [coin, setCoin] = useState("");
  const { id } = useParams();

  let assetURL = `https://api.coingecko.com/api/v3/coins/${id}`;

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "caa0b747e0mshc869274a8f77de6p125aa0jsn9f3f6ee2b9a8",
        "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
      },
    };

    const fetchAsset = async () => {
      try {
        const assetResponse = await fetch(assetURL, options);
        setSingleLoading(true);
        if (!assetResponse.ok) {
          throw new Error("Sorry, We Could Not Find Data For This Coin");
        } else {
          const assetData = await assetResponse.json();
          setSingleLoading(false);
          setCoin(assetData);
        }
      } catch (error) {}
    };

    fetchAsset();
  }, [id]);

  const getStyledValue = (value) => {
    return {
      color: value > 0 ? "green" : "red",
    };
  };

  function removeLinksFromDescription(description) {
    // Regular expression to match HTML link tags
    const linkRegex = /<a\b[^>]*>(.*?)<\/a>/gi;

    // Replace all link tags with an empty string
    const descriptionWithoutLinks = description.replace(linkRegex, "");

    return descriptionWithoutLinks;
  }

  return (
    <section className="displaySection assetPage">
      {singleLoading ? (
        <PropagateLoader color="#dd2b0b" size={30} speedMultiplier={1} />
      ) : coin ? (
        <div className="coinContainer">
          <div className="content">
            <h1>
              {coin?.name} ({coin?.symbol.toUpperCase()})
            </h1>
          </div>
          <div className="innerContent ">
            <div className="rank">
              <span className="rank-btn">Rank # {coin?.market_cap_rank}</span>
            </div>
            <div className="info">
              <div className="coinHeading">
                <a
                  href={coin?.links?.homepage?.[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={coin?.image?.small} alt={coin?.symbol} />{" "}
                </a>
              </div>
              <div className="coinPrice">
                <h1>${coin?.market_data?.current_price?.usd}</h1>
              </div>
            </div>
          </div>
          <div className="tableContent">
            <table>
              <thead>
                <tr>
                  <th>1h</th>
                  <th>24h</th>
                  <th>7d</th>
                  <th>14</th>
                  <th>30d</th>
                  <th>1yr</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={getStyledValue(
                      coin?.market_data?.price_change_percentage_1h_in_currency
                        ?.usd
                    )}
                  >
                    {coin?.market_data?.price_change_percentage_1h_in_currency?.usd.toFixed(
                      2
                    )}
                    %
                  </td>
                  <td
                    style={getStyledValue(
                      coin?.market_data?.price_change_percentage_24h
                    )}
                  >
                    {coin?.market_data?.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td
                    style={getStyledValue(
                      coin?.market_data?.price_change_percentage_7d
                    )}
                  >
                    {coin?.market_data?.price_change_percentage_7d.toFixed(2)}%
                  </td>
                  <td
                    style={getStyledValue(
                      coin?.market_data?.price_change_percentage_14d
                    )}
                  >
                    {coin?.market_data?.price_change_percentage_14d.toFixed(2)}%
                  </td>
                  <td
                    style={getStyledValue(
                      coin?.market_data?.price_change_percentage_30d
                    )}
                  >
                    {coin?.market_data?.price_change_percentage_30d.toFixed(2)}%
                  </td>
                  <td
                    style={getStyledValue(
                      coin?.market_data?.price_change_percentage_1y
                    )}
                  >
                    {coin?.market_data?.price_change_percentage_1y.toFixed(2)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content">
            <div className="stats">
              <div className="left">
                <div className="row">
                  <h4>24 hour High</h4>
                  <br />
                  <p>$ {coin?.market_data?.high_24h?.usd}</p>
                </div>
                <div className="row">
                  <h4>24 hour Low</h4>
                  <br />
                  <p>$ {coin?.market_data?.low_24h?.usd}</p>
                </div>
              </div>

              <div className="right">
                <div className="row">
                  <h4>Market Cap</h4>
                  <br />
                  <p>$ {formatMarketCap(coin?.market_data?.market_cap?.usd)}</p>
                </div>
                <div className="row">
                  <h4>Circulating Supply</h4>
                  <br />
                  <p>
                    {formatMarketCap(
                      coin?.market_data?.circulating_supply.toFixed(0)
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="about">
                {removeLinksFromDescription(coin?.description?.en)}
              </div>
            </div>
          </div>
          <br />
          <br />
          {/* /* Added BR tags*/}
          <div className="chartHolder">
            <Chart coin={coin} />
          </div>
        </div>
      ) : (
        <HomePage />
      )}
    </section>
  );
};

export default AssetPage;

/* 



Price chart using chart.js



*/
