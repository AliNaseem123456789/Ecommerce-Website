import React, { useState } from "react";
import { supabase } from "../pages/SupabaseClient";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    // 1️⃣ Sign up in Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);

    // 2️⃣ Insert profile into users1
    await supabase.from("users_test").insert({
      id: data.user.id,
      name,
    });

    alert("Account created! Please check your email for verification.");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Create Account</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
