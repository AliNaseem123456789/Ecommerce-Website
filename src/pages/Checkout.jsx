// pages/Checkout.jsx
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { CartContext } from "../components/CartContext";
import { supabase } from "./SupabaseClient";

import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Collapse,
  Paper,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  InputAdornment,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import AddCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";

export default function Checkout() {
  const { user } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext);

  // Step control:
  // 0 -> Deliver To open
  // 1 -> Shipping open
  // 2 -> Payment open
  const [activeStep, setActiveStep] = useState(0);

  // Track which steps are completed / collapsed
  const [completed, setCompleted] = useState({
    deliver: false,
    shipping: false,
    payment: false,
  });

  // Deliver form
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

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Shipping (dummy)
  const [shippingMethod, setShippingMethod] = useState({
    id: "standard",
    title: "Standard Shipping",
    price: 6.95,
    eta: "Delivery By Thu, Dec 11",
  });

  // Payment (dummy)
  const [paymentMethod, setPaymentMethod] = useState("paypal"); // default selected
  // Dummy credit card fields (only frontend)
  const [card, setCard] = useState({
    name_on_card: "",
    number: "",
    expiry: "",
    cvc: "",
  });
  const [showAddCard, setShowAddCard] = useState(false);

  // small effect: prefill user email
  useEffect(() => {
    setForm((f) => ({ ...f, email: user?.email || "" }));
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Helper: subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.products.price * item.quantity,
    0
  );

  // -------------------------------
  // PLACE ORDER (keeps your logic; unchanged)
  // -------------------------------
  const placeOrder = async () => {
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    setLoading(true);

    // use item.products.price as in your logic
    const subtotalLocal = cartItems.reduce(
      (total, item) => total + item.products.price * item.quantity,
      0
    );

    const shipping = shippingMethod?.price || 0;
    const tax = 0; // dummy
    const total = subtotalLocal + shipping + tax;

    // 1️⃣ Create Order
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          subtotal: subtotalLocal,
          shipping,
          tax,
          total,
        },
      ])
      .select()
      .single();

    if (orderErr) {
      alert("Error creating order: " + orderErr.message);
      setLoading(false);
      return;
    }

    // 2️⃣ Insert shipping address into shipping_address table
    const { error: addressErr } = await supabase.from("shipping_address").insert([
      {
        order_id: order.order_id,
        ...form,
      },
    ]);

    if (addressErr) {
      alert("Error saving address: " + addressErr.message);
      setLoading(false);
      return;
    }

    // 3️⃣ Insert order items — match your schema
    const orderItemsData = cartItems.map((item) => ({
      order_id: order.order_id,
      product_id: item.products.product_id,
      quantity: item.quantity,
      price: item.products.price,
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(orderItemsData);

    if (itemsErr) {
      alert("Error saving items: " + itemsErr.message);
      setLoading(false);
      return;
    }

    clearCart();
    setOrderSuccess(order.order_id);
    setLoading(false);
    // Optionally redirect or show success UI (we display success ID)
  };

  // -------------------------------
  // UI Step handlers
  // -------------------------------
  const saveDeliverContinue = () => {
    // basic validation: require name + street + postal
    if (!form.first_name || !form.last_name || !form.street || !form.postal_code) {
      alert("Please fill in name, street and postal code.");
      return;
    }
    setCompleted((c) => ({ ...c, deliver: true }));
    setActiveStep(1);
  };

  const saveShippingContinue = () => {
    // shipping chosen (dummy) - mark complete
    setCompleted((c) => ({ ...c, shipping: true }));
    setActiveStep(2);
  };

  const savePayment = () => {
    // basic check: if selecting card and not filled, block
    if (paymentMethod === "card" && (!card.number || !card.name_on_card || !card.cvc)) {
      alert("Please enter card details (this is frontend only).");
      return;
    }
    setCompleted((c) => ({ ...c, payment: true }));
    // keep Payment open or let user press Place Order on right side. We'll keep it collapsed to show summary.
    setActiveStep(-1); // collapse all
  };

  const reopenSection = (stepIndex) => {
    setActiveStep(stepIndex);
    // allow re-edit, but don't wipe completion
  };

  // Small helper to format address summary
  const renderDeliverSummary = () => {
    const { first_name, last_name, street, apartment, city, state, postal_code } = form;
    return (
      <Box>
        <Typography sx={{ fontWeight: 700 }}>{first_name} {last_name}</Typography>
        <Typography>{street}{apartment ? ` • ${apartment}` : ""}</Typography>
        <Typography>{city}{city && state ? ", " : ""}{state} {postal_code}</Typography>
        <Button
          variant="text"
          onClick={() => reopenSection(0)}
          sx={{ textTransform: "none", mt: 1 }}
        >
          Change
        </Button>
      </Box>
    );
  };

  const renderShippingSummary = () => {
    return (
      <Box>
        <Typography sx={{ fontWeight: 700 }}>{shippingMethod.title}</Typography>
        <Typography sx={{ color: "green", fontSize: 13 }}>{shippingMethod.eta}</Typography>
        <Typography sx={{ mt: 1 }}>Shipping: ${shippingMethod.price.toFixed(2)}</Typography>
        <Button
          variant="text"
          onClick={() => reopenSection(1)}
          sx={{ textTransform: "none", mt: 1 }}
        >
          Change
        </Button>
      </Box>
    );
  };

  const renderPaymentSummary = () => {
    let label = "";
    if (paymentMethod === "paypal") label = "PayPal";
    else if (paymentMethod === "venmo") label = "Venmo";
    else if (paymentMethod === "klarna") label = "Klarna";
    else if (paymentMethod === "afterpay") label = "Afterpay";
    else if (paymentMethod === "card") label = `Card • ${card.name_on_card || "****"}`;
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LockIcon fontSize="small" />
        <Box>
          <Typography sx={{ fontWeight: 700 }}>{label}</Typography>
          <Button variant="text" onClick={() => reopenSection(2)} sx={{ textTransform: "none" }}>
            Change
          </Button>
        </Box>
      </Box>
    );
  };

  // Helper to get product thumbnail (local images)
  const getLocalImage = (id) => {
    try {
      return new URL(`/src/assets/products/${id}.jpeg`, import.meta.url).href;
    } catch {
      return "https://via.placeholder.com/80";
    }
  };

  return (
    <Box sx={{ maxWidth: "1400px", margin: "auto", padding: "24px" }}>
      <Grid container spacing={3}>
        {/* LEFT: Steps */}
        <Grid item xs={12} md={8}>
          {/* 1. Deliver To */}
          <Paper elevation={1} sx={{ mb: 2, p: 2 }}>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  1. Deliver To
                </Typography>
              </Box>

              <Box>
                {completed.deliver ? (
                  <Typography sx={{ color: "primary.main", fontWeight: 600 }}>Saved</Typography>
                ) : (
                  <Typography sx={{ color: "text.secondary" }}>Required</Typography>
                )}
              </Box>
            </Box>

            {/* If completed show summary; otherwise show form */}
            <Collapse in={!completed.deliver || activeStep === 0} timeout="auto">
              {!completed.deliver || activeStep === 0 ? (
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First Name"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last Name"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Street Address"
                        name="street"
                        value={form.street}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Door Buzzer, Building Code, Apt#, etc (optional)"
                        name="apartment"
                        value={form.apartment}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="ZIP / Postal Code"
                        name="postal_code"
                        value={form.postal_code}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="State / Region"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={saveDeliverContinue}
                      sx={{ textTransform: "none", bgcolor: "black", ":hover": { bgcolor: "#111" } }}
                    >
                      Save & Continue
                    </Button>
                  </Box>
                </Box>
              ) : null}
            </Collapse>

            {/* Completed summary (collapsed) */}
            {completed.deliver && activeStep !== 0 && (
              <Box sx={{ mt: 2 }}>
                {renderDeliverSummary()}
              </Box>
            )}
          </Paper>

          {/* 2. Shipping Method */}
          <Paper elevation={1} sx={{ mb: 2, p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                2. Shipping Method
              </Typography>
              <Box>
                {completed.shipping ? (
                  <Typography sx={{ color: "primary.main", fontWeight: 600 }}>Saved</Typography>
                ) : (
                  <Typography sx={{ color: "text.secondary" }}>Required</Typography>
                )}
              </Box>
            </Box>

            <Collapse in={!completed.shipping || activeStep === 1} timeout="auto">
              {!completed.shipping || activeStep === 1 ? (
                <Box sx={{ mt: 2 }}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <LocalShippingIcon />
                      </Grid>
                      <Grid item xs>
                        <Typography sx={{ fontWeight: 700 }}>{shippingMethod.title} • ${shippingMethod.price.toFixed(2)}</Typography>
                        <Typography sx={{ color: "green", fontSize: 13 }}>{shippingMethod.eta}</Typography>
                        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>Get It Shipped • Items ({cartItems.length})</Typography>
                      </Grid>
                    </Grid>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                      <Button variant="contained" onClick={saveShippingContinue} sx={{ textTransform: "none", bgcolor: "black", ":hover": { bgcolor: "#111" } }}>
                        Continue
                      </Button>
                    </Box>
                  </Paper>
                </Box>
              ) : null}
            </Collapse>

            {completed.shipping && activeStep !== 1 && (
              <Box sx={{ mt: 2 }}>
                {renderShippingSummary()}
              </Box>
            )}
          </Paper>

          {/* 3. Payment */}
          <Paper elevation={1} sx={{ mb: 2, p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                3. Payment
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LockIcon fontSize="small" sx={{ color: "text.secondary" }} />
                {completed.payment ? <Typography sx={{ color: "primary.main", fontWeight: 600 }}>Saved</Typography> : <Typography sx={{ color: "text.secondary" }}>Required</Typography>}
              </Box>
            </Box>

            <Collapse in={!completed.payment || activeStep === 2} timeout="auto">
              {!completed.payment || activeStep === 2 ? (
                <Box sx={{ mt: 2 }}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel value="paypal" control={<Radio />} label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><img src="/src/assets/paypal.png" alt="paypal" style={{ height: 22 }} /> Pay with PayPal</Box>} />
                      <FormControlLabel value="venmo" control={<Radio />} label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><img src="/src/assets/venmo.png" alt="venmo" style={{ height: 22 }} /> Pay with Venmo</Box>} />
                      <FormControlLabel value="klarna" control={<Radio />} label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><img src="/src/assets/klarna.png" alt="klarna" style={{ height: 22 }} /> Klarna</Box>} />
                      <FormControlLabel value="afterpay" control={<Radio />} label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><img src="/src/assets/afterpay.png" alt="afterpay" style={{ height: 22 }} /> Afterpay</Box>} />
                      <FormControlLabel value="card" control={<Radio />} label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><AddCardIcon /> Credit / Debit Card</Box>} />
                    </RadioGroup>
                  </FormControl>

                  {/* Add Card UI (frontend only) */}
                  {paymentMethod === "card" && (
                    <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Name on Card"
                            name="name_on_card"
                            value={card.name_on_card}
                            onChange={(e) => setCard({ ...card, name_on_card: e.target.value })}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Card Number"
                            name="number"
                            value={card.number}
                            onChange={(e) => setCard({ ...card, number: e.target.value })}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">****</InputAdornment>,
                            }}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Expiry (MM/YY)"
                            value={card.expiry}
                            onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            size="small"
                            label="CVC"
                            value={card.cvc}
                            onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  )}

                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button variant="contained" onClick={savePayment} sx={{ textTransform: "none", bgcolor: "black", ":hover": { bgcolor: "#111" } }}>
                      Save & Continue
                    </Button>
                  </Box>
                </Box>
              ) : null}
            </Collapse>

            {completed.payment && activeStep !== 2 && (
              <Box sx={{ mt: 2 }}>
                {renderPaymentSummary()}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* RIGHT: Order summary & gift/promo area */}
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Order Summary</Typography>

            <Divider sx={{ mb: 2 }} />

            <List dense>
              {cartItems.map((item) => (
                <ListItem key={item.cart_item_id} sx={{ alignItems: "flex-start" }}>
                  <ListItemAvatar>
                    <Avatar variant="square" src={getLocalImage(item.products.product_id)} sx={{ width: 56, height: 56, borderRadius: 1 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 600 }}>{item.products.name}</Typography>}
                    secondary={<Typography sx={{ color: "text.secondary" }}>{item.quantity} × ${item.products.price.toFixed(2)}</Typography>}
                    sx={{ ml: 1 }}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Subtotal</Typography>
              <Typography sx={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Shipping</Typography>
              <Typography>${shippingMethod.price.toFixed(2)}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography>Estimated Tax</Typography>
              <Typography>$0.00</Typography>
            </Box>

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Typography sx={{ fontWeight: 800 }}>Estimated Total</Typography>
              <Typography sx={{ fontWeight: 800 }}>${(subtotal + shippingMethod.price).toFixed(2)}</Typography>
            </Box>

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
              <Typography sx={{ mt: 2, color: "green" }}>
                Order placed! Order ID: {orderSuccess}
              </Typography>
            )}
          </Paper>

          {/* Gift / promo area (matches screenshot styling) */}
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>Gift & Promo</Typography>
            <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}>
              Add a gift message or promo code
            </Typography>

            <TextField
              fullWidth
              size="small"
              placeholder="Promo Code"
              sx={{ mb: 1 }}
            />
            <Button variant="outlined" fullWidth sx={{ textTransform: "none" }}>Apply</Button>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PaymentIcon />
              <Box>
                <Typography sx={{ fontWeight: 700 }}>The Store Credit Card Program</Typography>
                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>Save on this order when you open and use your store credit card*</Typography>
                <Button sx={{ mt: 1, textTransform: "none" }}>See Details</Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
