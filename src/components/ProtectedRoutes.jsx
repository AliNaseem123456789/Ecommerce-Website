import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  
  console.log("🔐 ProtectedRoute Debug:", { 
    user, 
    loading,
    hasUser: !!user,
    timestamp: new Date().toISOString() 
  });

  if (loading) {
    console.log("⏳ Still loading auth state...");
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <p>Loading authentication...</p>
      </div>
    );
  }

  console.log("✅ Loading complete. User exists?", !!user);
  
  if (!user) {
    console.log("🚫 No user found, redirecting to /required-login");
    return <Navigate to="/required-login" replace />;
  }

  console.log("🎉 User authenticated, rendering children");
  return children;
}