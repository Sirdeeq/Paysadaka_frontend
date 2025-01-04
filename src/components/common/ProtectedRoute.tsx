import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if the user is logged in by checking localStorage for a token
  const isAuthenticated = localStorage.getItem('authToken');

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
