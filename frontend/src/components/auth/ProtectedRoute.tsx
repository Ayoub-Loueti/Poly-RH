import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Use the same key as in AuthContext
const USER_STORAGE_KEY = 'polyrh_user';

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated by looking for user data in localStorage
    const checkAuth = () => {
      const userData = localStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        try {
          // Verify that the stored data is valid JSON
          const parsedData = JSON.parse(userData);
          setIsAuthenticated(true);
          setUserRole(parsedData.role);
        } catch (e) {
          // If JSON parsing fails, clear the invalid data
          localStorage.removeItem(USER_STORAGE_KEY);
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
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

  // If role-based access is required, check if user has the correct role
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'employe') {
      return <Navigate to="/employee" replace />;
    } else if (userRole === 'admin' || userRole === 'Rh') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  // If authenticated and has correct role (if required), render the protected element
  return element;
};

export default ProtectedRoute;