import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>
        Powered by{" "}
        <a
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CoinGecko
        </a>
      </p>
    </footer>
  );
};

export default Footer;
