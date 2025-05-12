import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface EmployeRestrictedRouteProps {
  children: ReactNode;
}

const EmployeRestrictedRoute: React.FC<EmployeRestrictedRouteProps> = ({ children }) => {
  const userType = localStorage.getItem('role');
  const location = useLocation();

  // Define allowed paths for employees
  const allowedPaths = ['/mainLayout', '/absence', '/hr-message'];

  // Check if current path is allowed for employees
  const isAllowedPath = allowedPaths.some((path) => location.pathname.startsWith(path));

  // If user is employee but trying to access non-employee path, redirect
  if (userType === 'employe' && !isAllowedPath) {
    return <Navigate to="/" replace />;
  }

  // If non-employee trying to access employee paths, redirect
  if (userType !== 'employe' && isAllowedPath) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default EmployeRestrictedRoute;