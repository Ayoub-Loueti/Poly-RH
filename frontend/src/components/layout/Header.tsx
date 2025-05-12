import React from 'react';
import { Building2, User, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContextEmploye';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Use the same key as in AuthContext
const USER_STORAGE_KEY = 'polyrh_user';

const Header: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all localStorage data
    localStorage.clear();
    // Navigate to login page
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/employee" className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">PolyRH</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <NavLink to="/employee" current={location.pathname === '/employee'}>
              Dashboard
            </NavLink>
            <NavLink to="/employee/absence" current={location.pathname === '/employee/absence'}>
              Request Absence
            </NavLink>
            <NavLink to="/employee/hr-message" current={location.pathname === '/employee/hr-message'}>
              HR Message
            </NavLink>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">
                  {user ? `${user.first_name} ${user.last_name}` : ''}
                </div>
                <div className="text-xs text-gray-500">{user?.role}</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/employee" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-50">Dashboard</Link>
          <Link to="/employee/absence" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Request Absence</Link>
          <Link to="/employee/hr-message" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">HR Message</Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  current: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, current, children }) => {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        current
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-400'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;