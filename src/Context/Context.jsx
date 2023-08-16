import React, { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byRating: 0,
    searchQuery: "",
  });

  const dollarToRupees = 70;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const products = data.map((product) => ({
          id: product.id,
          name: product.title,
          description: product.description,
          price: Math.floor(product.price * dollarToRupees).toFixed(2),
          image: product.image,
          inStock: product.rating.count,
          ratings: product.rating.rate,
        }));

        dispatch({ type: "SET_PRODUCTS", payload: products });
      } catch (error) {
        console.error("Error fetching products from API:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
