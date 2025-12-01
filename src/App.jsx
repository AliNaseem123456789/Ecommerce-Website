import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/CartContext";
import LandingPage from "./pages/LandingPage";
function App() {
  
  return (
    <CartProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/Home" element={<LandingPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
