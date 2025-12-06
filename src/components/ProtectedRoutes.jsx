import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // ❗ FIX: While loading, do NOT redirect
  if (loading) return null; // or a loader

  // After loading, check auth
  if (!user) return <Navigate to="/required-login" replace />;

  return children;
}
