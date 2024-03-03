import React from "react";
import "../styles/SearchedCoin.css";
const SearchedCoin = ({ coin, handleCardClick, formatMarketCap }) => {
  return (
    <article
      className="cryptoCard"
      onClick={() => {
        handleCardClick(coin?.id);
      }}
    >
      <div className="topHalfOfCard">
        <div className="rankHolder">#{coin?.market_cap_rank}</div>
        <div className="nameHolder">
          <span>
            {coin?.name}({coin?.symbol.toUpperCase()})
          </span>
        </div>
        <div className="infoHolder">
          <div className="imageHolder">
            <img src={coin?.image?.small} alt={coin?.symbol} />
          </div>
        </div>
      </div>

      <div className="bottomHalfOfCard">
        <div className="priceHolder">
          <strong>Price:</strong> ${coin?.market_data?.current_price?.usd}
        </div>

        <div className="mktCapHolder">
          <strong>Market Cap:</strong> $
          {formatMarketCap(coin?.market_data?.market_cap?.usd)}
        </div>

        <div className="PriceChangeHolder">
          <strong>Daily Change:</strong>
          <span
            style={{
              color:
                coin?.market_data?.price_change_percentage_24h > 0.0
                  ? "green"
                  : "red",
            }}
          >
            {coin?.market_data?.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      </div>
    </article>
  );
};

export default SearchedCoin;
