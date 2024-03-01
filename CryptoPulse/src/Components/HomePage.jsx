import React, { useEffect } from "react";
import useFetch from "./useFetch";
import PropagateLoader from "react-spinners/PropagateLoader";
import CoinCard from "./CoinCard";
import SearchedCoin from "./SearchedCoin";

const HomePage = ({
  searchURL,
  setSingleLoading,
  setCoinSearch,
  url,
  coinSearch,
  API,
  singleLoading,
}) => {
  const { loading, cryptoData } = useFetch(API);
  //   const initialURL =
  //     "https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=20&order=market_cap_desc";
  //   const [API, setAPI] = useState(initialURL);
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
          console.log(result.symbol.toUpperCase());
          setCoinSearch(result);
          // console.log(coinSearch);
        }
      } catch (error) {
        error.name === "AbortError"
          ? console.error("Fetch aborted")
          : console.error(error.message);
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
        <SearchedCoin key={coinSearch.name} coin={coinSearch} />
      ) : (
        cryptoData.map((crypto) => (
          <CoinCard key={crypto.name} crypto={crypto} />
        ))
      )}
    </section>
  );
};

export default HomePage;
