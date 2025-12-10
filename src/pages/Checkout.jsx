// pages/Checkout.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { CartContext } from "../components/CartContext";
import { supabase } from "./SupabaseClient";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Button } from "@mui/material";

import CheckoutDeliver from "../components/Checkout/CheckoutDeliver";
import CheckoutShipping from "../components/Checkout/CheckoutShipping";
import CheckoutPayment from "../components/Checkout/CheckoutPayment";
import CheckoutSummary from "../components/Checkout/CheckoutSummary";
import CheckoutPromo from "../components/Checkout/CheckoutPromo";
import CheckoutGuest from "../components/Checkout/CheckoutGuest";

import paypal from "../assets/Logos/Paypal.jpeg";
import karna from "../assets/Logos/karna.jpeg";
import afterpay from "../assets/Logos/afterpay.jpeg";
import venmo from "../assets/Logos/VENMO.png";

export default function Checkout() {
  const { user } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({ deliver: false, shipping: false, payment: false });

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: user?.email || "",
    phone: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    postal_code: "",
  });

  const [shippingMethod, setShippingMethod] = useState({
    id: "standard",
    title: "Standard Shipping",
    price: 6.95,
    eta: "Delivery By Thu, Dec 11",
  });

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [card, setCard] = useState({ name_on_card: "", number: "", expiry: "", cvc: "" });

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    setForm((f) => ({ ...f, email: user?.email || "" }));
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const subtotal = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0);

  // ---------------- Order Functions ----------------
  const placeOrder = async () => {
    if (!user) return alert("You must be logged in to place an order.");
    setLoading(true);

    const subtotalLocal = cartItems.reduce((total, item) => total + item.products.price * item.quantity, 0);
    const shipping = shippingMethod?.price || 0;
    const tax = 0;
    const total = subtotalLocal + shipping + tax;

    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert([{ user_id: user.id, subtotal: subtotalLocal, shipping, tax, total }])
      .select()
      .single();

    if (orderErr) return alert("Error creating order: " + orderErr.message);

    const { error: addressErr } = await supabase.from("shipping_address").insert([{ order_id: order.order_id, ...form }]);
    if (addressErr) return alert("Error saving address: " + addressErr.message);

    const orderItemsData = cartItems.map((item) => ({
      order_id: order.order_id,
      product_id: item.products.product_id,
      quantity: item.quantity,
      price: item.products.price,
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(orderItemsData);
    if (itemsErr) return alert("Error saving items: " + itemsErr.message);

    clearCart();
    setOrderSuccess(order.order_id);
    setLoading(false);
  };

  // ---------------- Step Functions ----------------
  const saveDeliverContinue = () => {
    if (!form.first_name || !form.last_name || !form.street || !form.postal_code)
      return alert("Please fill in name, street and postal code.");
    setCompleted((c) => ({ ...c, deliver: true }));
    setActiveStep(1);
  };

  const saveShippingContinue = () => {
    setCompleted((c) => ({ ...c, shipping: true }));
    setActiveStep(2);
  };

  const savePayment = () => {
    if (paymentMethod === "card" && (!card.number || !card.name_on_card || !card.cvc))
      return alert("Please enter card details (frontend only).");
    setCompleted((c) => ({ ...c, payment: true }));
    setActiveStep(-1);
  };

  const reopenSection = (stepIndex) => setActiveStep(stepIndex);

  const logos = { paypal, venmo, klarna: karna, afterpay };

  return (
    <Box sx={{ maxWidth: "1400px", margin: "auto", padding: "24px", backgroundColor: "#f9fafb" }}>
         <CheckoutGuest />
      <Grid container spacing={3}>
        {/* Left: Steps */}
        <Grid item xs={12} md={8}>
          <CheckoutDeliver
            form={form}
            handleChange={handleChange}
            completed={completed}
            activeStep={activeStep}
            saveDeliverContinue={saveDeliverContinue}
            reopenSection={reopenSection}
          />

          <CheckoutShipping
            shippingMethod={shippingMethod}
            completed={completed}
            activeStep={activeStep}
            saveShippingContinue={saveShippingContinue}
            reopenSection={reopenSection}
            cartItems={cartItems}
          />

          <CheckoutPayment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            card={card}
            setCard={setCard}
            completed={completed}
            activeStep={activeStep}
            savePayment={savePayment}
            reopenSection={reopenSection}
            logos={logos}
          />
        </Grid>

        {/* Right: Summary */}
        <Grid item xs={12} md={4}>
          <CheckoutSummary
            cartItems={cartItems.map(item => ({ ...item, image: `https://via.placeholder.com/80` }))}
            subtotal={subtotal}
            shippingMethod={shippingMethod}
            loading={loading}
            placeOrder={placeOrder}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={placeOrder}
            disabled={loading}
            sx={{ mt: 2, background: "#e60023", ":hover": { background: "#c4001d" }, textTransform: "none" }}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>

          {orderSuccess && (
            <Box sx={{ mt: 2, color: "green" }}>
              Order placed! Order ID: {orderSuccess}
            </Box>
          )}

          <CheckoutPromo />
        </Grid>
      </Grid>
    </Box>
  );
}
