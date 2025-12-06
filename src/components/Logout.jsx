import React, { useContext } from "react";
import { supabase } from "../pages/SupabaseClient";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();

    
  };

  return <button onClick={handleLogout}>Logout</button>;
}
