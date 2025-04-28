import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Use the same key as in AuthContext
const USER_STORAGE_KEY = 'polyrh_user';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated by looking for user data in localStorage
    const checkAuth = () => {
      const userData = localStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        try {
          // Verify that the stored data is valid JSON
          JSON.parse(userData);
          setIsAuthenticated(true);
        } catch (e) {
          // If JSON parsing fails, clear the invalid data
          localStorage.removeItem(USER_STORAGE_KEY);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected element
  return element;
};

export default ProtectedRoute;