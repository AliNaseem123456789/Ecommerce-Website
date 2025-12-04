import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/CartContext";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import FooterFeatures from "./components/FooterFeatures";
import MobileSearch from "./components/MobileSearch";

// Import the new pages for footer links
import AboutUs from "./pages/static/AboutUs";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";
import TermsConditions from "./pages/static/TermsAndConditions";
import ContactUs from "./pages/static/ContactUs";
import RefundReturns from "./pages/static/RefundReturns";
// import MyAccount from "./pages/MyAccount";
// import TrackOrder from "./pages/TrackOrder";
// import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<MobileSearch />} />

          {/* Footer-related routes */}
          <Route path="/about-us" element={<AboutUs />}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} /> 
          <Route path="/contact-us" element={<ContactUs />} /> 
          <Route path="/refund-returns" element={<RefundReturns />} />
          {/* <Route path="/my-account" element={<MyAccount />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/wishlist" element={<Wishlist />} /> */}
        </Routes>
        <FooterFeatures />
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
