import React, { useState, useContext } from "react";
import { supabase } from "../pages/SupabaseClient";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";

export default function AuthModal({ onClose }) {
  const { setUser } = useContext(AuthContext);
  const { userId: guestId, mergeCart } = useContext(CartContext);

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return alert(error.message);

  if (mergeCart && guestId) {
    await mergeCart(guestId, data.user.id);
  }

  setUser(data.user);

  // Call onClose with "loggedIn = true" so LandingNavbar can navigate
  onClose(true);
};

  const handleSignup = async () => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
        email: email, // storing email inside metadata too
      }
    }
  });

  if (error) return alert(error.message);

  const authId = data.user?.id || data.session?.user?.id;

  // OPTIONAL: If you still want to insert into users_test table
  if (authId) {
    await supabase.from("users_test").insert({
      auth_user_id: authId,
      name: name,
      email: email,
    });
  }

  setUser(data.user);
  onClose();
};


  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(3px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          borderRadius: "12px",
          padding: "40px",
          position: "relative",
          boxShadow: "0px 4px 30px rgba(0,0,0,0.15)",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            border: "none",
            background: "none",
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* TITLE */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            marginBottom: "10px",
            fontWeight: "700",
          }}
        >
          {mode === "login" ? "Sign In" : "Sign Up"}
        </h2>

        {/* SUBTITLE */}
        <p
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: "14px",
            marginBottom: "25px",
          }}
        >
          {mode === "login" ? (
            <>
              Don’t have an account yet?{" "}
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={() => setMode("signup")}
              >
                Sign up for free
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={() => setMode("login")}
              >
                Log in
              </span>
            </>
          )}
        </p>

        {/* FORM */}
        <div>
          {/* SIGNUP NAME FIELD */}
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                border: "1px solid #ddd",
                borderRadius: "40px",
                fontSize: "15px",
                marginBottom: "15px",
              }}
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Your username or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #ddd",
              borderRadius: "40px",
              marginBottom: "15px",
              fontSize: "15px",
            }}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #ddd",
              borderRadius: "40px",
              marginBottom: "15px",
              fontSize: "15px",
            }}
          />

          {/* LOGIN OPTIONS */}
          {mode === "login" && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                marginBottom: "15px",
              }}
            >
              <label>
                <input type="checkbox" /> Stay signed in
              </label>

              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                Forgot your password?
              </span>
            </div>
          )}

          {/* SIGNUP POLICY */}
          {mode === "signup" && (
            <label
              style={{ fontSize: "14px", display: "block", marginBottom: "15px" }}
            >
              <input type="checkbox" /> Yes, I agree with Privacy Policy and
              Terms of Use
            </label>
          )}

          {/* SUBMIT BUTTON */}
          <button
            onClick={mode === "login" ? handleLogin : handleSignup}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "40px",
              background: "#000",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {mode === "login" ? "LOG IN" : "SIGN UP"}
          </button>
        </div>
      </div>
    </div>
  );
}
