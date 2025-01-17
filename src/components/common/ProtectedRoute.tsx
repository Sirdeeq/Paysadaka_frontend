import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if the user is logged in by checking localStorage for a token
  const authToken = localStorage.getItem("authToken");
  const tokenExpiration = localStorage.getItem("tokenExpiration"); // Assume expiration is stored in milliseconds

  // Validate token expiration
  if (!authToken || (tokenExpiration && Date.now() > Number(tokenExpiration))) {
    // Clear invalid tokens or expired session data
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiration");

    // Redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated and token is valid, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
