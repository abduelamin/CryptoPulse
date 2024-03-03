import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/GainersCarousel.css";
import PropagateLoader from "react-spinners/PropagateLoader";

const Gainers = ({ setgainerFetched }) => {
  const [topGainers, setTopGainers] = useState([]);

  useEffect(() => {
    const fetchTopGainers = async () => {
      try {
        const currency = "usd";
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=percent_change_24h&per_page=5&page=1&sparkline=false`
        );
        const data = await response.json();
        setTopGainers(data);
      } catch (error) {
        console.error("Error fetching top gainers data:", error);
      }
    };
    // topGainers.symbol ? setgainerFetched(true) : setgainerFetched(false);
    // fetchTopGainers();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="gainers-carousel-container">
      <h2 className="gainers-carousel-title">Top Gainers</h2>
      {topGainers.length === 0 ? null : (
        <Slider {...settings}>
          {topGainers.map((gainer) => (
            <div key={gainer.id} className="gainer-card">
              <h3 className="gainer-name">
                {/* {gainer.name} */}
                {gainer.symbol.toUpperCase()}
              </h3>
              <p className="gainer-price">{`Price: $ ${gainer.current_price}`}</p>
              <strong>
                {" "}
                <p
                  className="gainer-change"
                  style={{ color: "green" }}
                >{`+ ${gainer.price_change_percentage_24h.toFixed(2)}%`}</p>
              </strong>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Gainers;

//COINGECKO
