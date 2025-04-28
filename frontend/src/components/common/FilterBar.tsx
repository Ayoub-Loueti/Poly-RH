import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import './FilterBar.css';

const FilterBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="filter-bar">
      <button 
        className="filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={16} />
        <span>Filters</span>
        <ChevronDown size={16} className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="filter-dropdown">
          <div className="filter-group">
            <label className="filter-label">Time Period</label>
            <select className="filter-select">
              <option value="30">Last 30 Days</option>
              <option value="90">Last Quarter</option>
              <option value="180">Last 6 Months</option>
              <option value="365">Last Year</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Department</label>
            <select className="filter-select">
              <option value="all">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="hr">Human Resources</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Employee Type</label>
            <select className="filter-select">
              <option value="all">All Employees</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          
          <div className="filter-actions">
            <button className="filter-reset">Reset</button>
            <button className="filter-apply">Apply Filters</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;