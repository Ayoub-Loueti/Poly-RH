import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BarChart, Users, TrendingDown, Clock, 
  Award, FileText, Settings, LogOut, BarChart2, UserPlus 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

// Use the same key as in AuthContext
const USER_STORAGE_KEY = 'polyrh_user';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Also remove from localStorage directly to ensure consistency
    localStorage.removeItem(USER_STORAGE_KEY);
    // Navigate to login page
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>PolyRH</h2>}
        {collapsed && <BarChart2 size={24} />}
      </div>
      
      <div className="user-info">
        <div className="avatar">
          {user?.name?.charAt(0) || 'U'}
        </div>
        {!collapsed && (
          <div className="user-details">
            <p className="user-name">{user?.name || 'Admin User'}</p>
            <p className="user-role">{user?.role || 'HR Manager'}</p>
          </div>
        )}
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          <BarChart size={20} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>
          <Users size={20} />
          {!collapsed && <span>Employees</span>}
        </NavLink>
        <NavLink to="/rhcom" className={({ isActive }) => isActive ? 'active' : ''}>
          <UserPlus size={20} />
          {!collapsed && <span>RH Community</span>}
        </NavLink>
        <NavLink to="/turnover" className={({ isActive }) => isActive ? 'active' : ''}>
          <TrendingDown size={20} />
          {!collapsed && <span>Turnover</span>}
        </NavLink>
        <NavLink to="/absenteeism" className={({ isActive }) => isActive ? 'active' : ''}>
          <Clock size={20} />
          {!collapsed && <span>Absenteeism</span>}
        </NavLink>
        <NavLink to="/performance" className={({ isActive }) => isActive ? 'active' : ''}>
          <Award size={20} />
          {!collapsed && <span>Performance</span>}
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
          <FileText size={20} />
          {!collapsed && <span>Reports</span>}
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;