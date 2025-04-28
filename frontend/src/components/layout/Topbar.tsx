import React from 'react';
import { Menu, Bell, Search, Download } from 'lucide-react';
import './Topbar.css';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <div className="search-bar">
          <Search size={16} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      
      <div className="topbar-right">
        <button className="export-button">
          <Download size={16} />
          <span>Export</span>
        </button>
        <div className="notification-bell">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;