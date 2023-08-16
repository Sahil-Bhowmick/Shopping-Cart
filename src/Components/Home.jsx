import React, { useState, useEffect } from "react";
import { CartState } from "../Context/Context";
import SingleProduct from "./SingleProduct";
import "./styles.css";
import Filters from "./Filters";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const Home = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 2) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const {
    state: { products },
    productState: { sort, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id} />;
        })}
      </div>
      {showBackToTop && (
        <button
          className="backToTopButton"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <BsFillArrowUpCircleFill style={{ fontSize: "30px" }} />
        </button>
      )}
    </div>
  );
};

export default Home;
