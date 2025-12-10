import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { CartProvider, CartContext } from "./components/CartContext";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import FooterFeatures from "./components/FooterFeatures";
import MobileSearch from "./components/MobileSearch";
import { AuthProvider } from "./components/AuthContext";
// Import the new pages for footer links
import AboutUs from "./pages/static/AboutUs";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";
import TermsConditions from "./pages/static/TermsAndConditions";
import ContactUs from "./pages/static/ContactUs";
import RefundReturns from "./pages/static/RefundReturns";
// import MyAccount from "./pages/MyAccount";
// import TrackOrder from "./pages/TrackOrder";
import Wishlist from "./pages/Wishlist";
import CartSidebar from "./components/CartSidebar";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoutes";
import LoginRequired from "./pages/LoginRequired";
import Home from "./pages/Home"
// ⭐ Add Wishlist Provider Import
import { WishlistProvider } from "./components/WishlistContext";
import Checkout from "./pages/Checkout";
import Breadcrumbs from "./components/Breadcrumbs";
import NotFoundPage from "./pages/NotFoundPage";

import FAQ from "./pages/static/FAQ"
function AppWrapper() {
  const { isSidebarOpen, closeSidebar } = useContext(CartContext);
  const location = useLocation();

  // Do not show sidebar on the main cart page
  const showSidebar = isSidebarOpen && location.pathname !== "/cart";

  return (
    <>
    {location.pathname !=="/" && !location.pathname.startsWith("/products") &&( <Navbar />)}
     
      
     {location.pathname !== "/" && location.pathname !== "/home"  && location.pathname !== "/Home" && !location.pathname.startsWith("/product") && (
  <Breadcrumbs />
)}


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<MobileSearch />} />

        {/* Footer-related routes */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/refund-returns" element={<RefundReturns />} />
        <Route path="/Account" element={<Account />}/>
        <Route path="/track-order" element={<Account />} />
        <Route path="/NotFoundPage" element={<NotFoundPage />} />
        <Route path="/faq" element={<FAQ />} />
        {/* // <Route path="/wishlist" element={<Wishlist />} />  */}

        {/* Auth */}
         {/* <Route path="/login" element={<Login />} /> 
         <Route path="/signup" element={<Signup />} />  */}
         {/* <Route path="/account" element={<Account />} />  */}
         <Route path="/login-required" element={<LoginRequired />} />
         <Route path="/account" element={ <ProtectedRoute> <Account /> </ProtectedRoute>}/>
         <Route path="/checkout" element={<Checkout />}/>
      </Routes>

      {/* Render Cart Sidebar only if not on /cart page */}
      {showSidebar && <CartSidebar onClose={closeSidebar} />}

      {/* <FooterFeatures /> */}
      <Footer />
    </>
  );
}

function App() {
  return (
    // ⭐ Wrap your whole app with WishlistProvider (added safely)
    <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <AppWrapper />
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
