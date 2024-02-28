import React from "react";
import "../styles/CoinCard.css";

const CoinCard = ({ crypto }) => {
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

  return (
    <article className="cryptoCard">
      <div className="topHalfOfCard">
        <div className="rankHolder">{crypto?.market_cap_rank}</div>
        <div className="nameHolder">
          <span>
            {crypto?.name}({crypto?.symbol.toUpperCase()})
          </span>
        </div>
        <div className="infoHolder">
          <div className="imageHolder">
            <img src={crypto?.image} alt={crypto?.symbol} />
          </div>
        </div>
      </div>

      <div className="bottomHalfOfCard">
        <div className="priceHolder">
          <strong>Price:</strong> ${crypto?.current_price}
        </div>

        <div className="mktCapHolder">
          <strong>Market Cap:</strong> ${formatMarketCap(crypto?.market_cap)}
        </div>

        <div className="PriceChangeHolder">
          <strong>Daily Change:</strong>{" "}
          <span
            style={{
              color:
                crypto?.price_change_percentage_24h > 0.0 ? "green" : "red",
            }}
          >
            {crypto?.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </article>
  );
};

export default CoinCard;
