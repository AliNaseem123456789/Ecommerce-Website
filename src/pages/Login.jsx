// import React, { useState, useContext } from "react";
// import { supabase } from "../pages/SupabaseClient";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../components/AuthContext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

//   const handleLogin = async () => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) return alert(error.message);

//     setUser(data.user);

//     // TODO: merge guest cart here if needed

//     navigate("/");
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button> 
//     </div>
//   );
// }
