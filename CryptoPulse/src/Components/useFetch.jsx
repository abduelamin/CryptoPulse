import React, { useState, useEffect } from "react";

const useFetch = (url) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "caa0b747e0mshc869274a8f77de6p125aa0jsn9f3f6ee2b9a8",
        "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
      },
    };

    const fetchCryptoData = async () => {
      try {
        const response = await fetch(url, options, { signal });
        setLoading(true);
        if (!response.ok) {
          throw new Error("Crypto Data Could Not Be Fetched");
        } else {
          const data = await response.json();
          setCryptoData(data);
        }
      } catch (error) {
        error.name === "AbortError"
          ? console.error("Fetch aborted")
          : console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    return () => {
      controller.abort();
    };
  }, [url]);

  return { loading, cryptoData };
};

export default useFetch;

// questions: why does this work fetch(url, options, signal) but when I do fetch(url, {options, signal}) it doesn't? I thought the 2nd pararmter in fetch is an object hence why I placed them in an object because if i do fetch(url, {signal}) it works just fine? - is the {signal} just destrucuting my const signal = contoller.signal ?
