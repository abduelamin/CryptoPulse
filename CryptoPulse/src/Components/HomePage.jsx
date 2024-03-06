import React, { useEffect, useState } from "react";
import useFetch from "./useFetch";
import PropagateLoader from "react-spinners/PropagateLoader";
import CoinCard from "./CoinCard";
import SearchedCoin from "./SearchedCoin";
import useModal from "./useModal";

const HomePage = ({
  searchURL,
  setSingleLoading,
  setCoinSearch,
  url,
  coinSearch,
  API,
  singleLoading,
  handleCardClick,
  formatMarketCap,
}) => {
  const { openModal } = useModal();
  const { loading, cryptoData } = useFetch(API);

  useEffect(() => {
    const newController = new AbortController();
    const signal = newController.signal;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "caa0b747e0mshc869274a8f77de6p125aa0jsn9f3f6ee2b9a8",
        "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
      },
    };

    const fetchSearch = async () => {
      try {
        const response = await fetch(url, options, { signal });
        setSingleLoading(true);
        if (!response.ok) {
          throw new Error("Crypto Data Could Not Be Fetched");
        } else {
          const result = await response.json();
          console.log(result);
          // Check if the required property exists in the result
          if (result && result.market_cap_rank) {
            setCoinSearch(result);
          } else {
            openModal();
          }
        }
      } catch (error) {
        error.name === "AbortError"
          ? console.error("Fetch aborted")
          : openModal();
      } finally {
        setSingleLoading(false);
      }
    };

    if (url) {
      fetchSearch();
    }

    return () => {
      newController.abort();
    };
  }, [url]);

  return (
    <section className="displaySection">
      {loading || singleLoading ? (
        <PropagateLoader color="#dd2b0b" size={30} speedMultiplier={1} />
      ) : coinSearch ? (
        <SearchedCoin
          key={coinSearch.name}
          coin={coinSearch}
          handleCardClick={handleCardClick}
          formatMarketCap={formatMarketCap}
        />
      ) : (
        cryptoData.map((crypto) => (
          <CoinCard
            key={crypto.name}
            crypto={crypto}
            handleCardClick={handleCardClick}
            formatMarketCap={formatMarketCap}
          />
        ))
      )}
    </section>
  );
};

export default HomePage;
