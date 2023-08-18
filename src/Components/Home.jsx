import React, { useState, useEffect } from "react";
import { CartState } from "../Context/CartContext";
import SingleProduct from "./SingleProduct";
import "./styles.css";
import Filters from "./Filters";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const Home = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [products, setProducts] = useState([]);
  const dollarToRupees = 70;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const transformedProducts = data.map((product) => ({
          id: product.id,
          name: product.title,
          description: product.description,
          price: (product.price * dollarToRupees).toFixed(2),
          image: product.image,
          inStock: product.rating.count,
          ratings: product.rating.rate,
        }));
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products from API:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const {
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
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
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
