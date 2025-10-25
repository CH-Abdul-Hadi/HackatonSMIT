import React, { useRef } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import Products from "./components/Products";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import OrderSummary from "./pages/OrderSummary";

const App = () => {
  
  
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<OrderSummary />} />
        <Route
          path="*"
          element={
            <h1 className="text-center mt-10 text-2xl">Page Not Found</h1>
          }
        />
      </Routes>
      <Footer />
      </Router>
    </>
  );
};

export default App;
