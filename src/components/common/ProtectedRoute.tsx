import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if the user is logged in by checking localStorage for a token
  const isAuthenticated = localStorage.getItem("authToken");
  const tokenExpiration = localStorage.getItem("tokenExpiration"); // Assume you store expiration time on login
  if (isAuthenticated && Date.now() > tokenExpiration) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
