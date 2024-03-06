import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/GainersCarousel.css";

const Gainers = () => {
  const [topGainers, setTopGainers] = useState([]);

  useEffect(() => {
    const fetchTopGainers = async () => {
      try {
        const currency = "usd";
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=percent_change_24h&per_page=8&page=1&sparkline=false`
        );
        const data = await response.json();
        setTopGainers(data);
      } catch (error) {
        console.error("Error fetching top gainers data:", error);
      }
    };
    fetchTopGainers();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="gainers-carousel-container">
      <h2 className="gainers-carousel-title">Top Movers</h2>
      {topGainers.length === 0 ? null : (
        <Slider {...settings}>
          {topGainers.map((gainer) => (
            <div key={gainer.id} className="gainer-card">
              <h3 className="gainer-name">{gainer.symbol.toUpperCase()}</h3>
              <p className="gainer-price">{`Price: $ ${gainer.current_price}`}</p>
              <strong>
                <p
                  className="gainer-change"
                  style={{
                    color:
                      gainer.price_change_percentage_24h >= 0
                        ? "#2ecc71"
                        : "#e74c3c",
                  }}
                >
                  {gainer.price_change_percentage_24h >= 0
                    ? ` + ${gainer.price_change_percentage_24h.toFixed(2)}%`
                    : `${gainer.price_change_percentage_24h.toFixed(2)}%`}
                </p>
              </strong>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Gainers;
