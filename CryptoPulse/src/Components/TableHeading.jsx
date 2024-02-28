import React from "react";

const TableHeading = () => {
  return (
    <section className="displaySection">
      <article className="cardHolder">
        <div className="rankHolder">#</div>

        <div className="nameHolder">Coin</div>
        <div className="priceHolder">Price</div>
        <div className="24hrPriceChangeHolder">24hr</div>
        <div className="volumeHolder">Volume</div>
        <div className="mktCapHolder">
          <abbr title="Market Cap" style={{ textDecoration: "none" }}>
            Mkt Cap
          </abbr>
        </div>
      </article>
    </section>
  );
};

export default TableHeading;

/* 

Question

- This component is the exact same as coinCard but I want to display hard coded text on here, whereas on coincard I'll be displaying fetched data. So is it correct to do it as separate components or is this poor practice. - I genuinely don't know how to make a universal component different one certain instances

*/
