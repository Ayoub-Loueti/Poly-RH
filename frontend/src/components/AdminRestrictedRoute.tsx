import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminRestrictedRoute {
  children: ReactNode;
}

const AdminRestrictedRoute: React.FC<AdminRestrictedRoute> = ({ children }) => {
  const userType = localStorage.getItem('role');
  const location = useLocation();

  // Define paths restricted to admin users (remove leading spaces)
  const adminRestrictedPaths = [
    '/layout',
    '/dashboard',
    '/employees',
    '/RHCom',
    '/settings',
    '/reports',
    '/turnover',
    '/performance',
    '/absenteeism',
  ];

  // Check if the current path is one of the restricted paths
  const isRestricted = adminRestrictedPaths.some((path) => location.pathname.startsWith(path));

  // Redirect if the path is restricted and userType is not 'admin' or 'rh'
  if (isRestricted && userType !== 'admin' && userType !== 'Rh') {
    return <Navigate to="/mainlayout" />;
  }

  return <>{children}</>;
};

export default AdminRestrictedRoute;