import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/cart" element={<Cart />} exact />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
