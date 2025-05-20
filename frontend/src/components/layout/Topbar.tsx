import React from 'react';
import { Menu, Bell, Search, Download } from 'lucide-react';
import axios from 'axios';
import './Topbar.css';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const handleExport = async () => {
    try {
      const response = await axios.get('/dashboard/export-pdf', {
        responseType: 'blob'
      });
      
      // Create blob and download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'departments.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
      alert('Error downloading PDF');
    }
  };

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
        <button className="export-button" onClick={handleExport}>
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