import React from 'react';
import { UserPlus, Search, Filter, MoreHorizontal } from 'lucide-react';
import '../styles/Employees.css';

const employeeData = [
  { id: 'EMP001', name: 'John Doe', department: 'Engineering', position: 'Senior Developer', status: 'Active', joinDate: '2020-05-15', performance: 92 },
  { id: 'EMP002', name: 'Jane Smith', department: 'Marketing', position: 'Marketing Manager', status: 'Active', joinDate: '2019-11-23', performance: 88 },
  { id: 'EMP003', name: 'Robert Johnson', department: 'Sales', position: 'Sales Representative', status: 'Active', joinDate: '2021-02-10', performance: 76 },
  { id: 'EMP004', name: 'Emily Brown', department: 'HR', position: 'HR Specialist', status: 'On Leave', joinDate: '2018-07-19', performance: 85 },
  { id: 'EMP005', name: 'Michael Wilson', department: 'Finance', position: 'Financial Analyst', status: 'Active', joinDate: '2022-01-05', performance: 90 },
  { id: 'EMP006', name: 'Sarah Davis', department: 'Engineering', position: 'UI/UX Designer', status: 'Active', joinDate: '2020-09-12', performance: 94 },
  { id: 'EMP007', name: 'David Miller', department: 'Sales', position: 'Sales Manager', status: 'Active', joinDate: '2019-03-28', performance: 82 },
  { id: 'EMP008', name: 'Jessica Wilson', department: 'Marketing', position: 'Content Specialist', status: 'Inactive', joinDate: '2021-06-17', performance: 65 },
];

const Employees: React.FC = () => {
  return (
    <div className="employees-page">
      <div className="employees-header">
        <div>
          <h1>Employees</h1>
          <p className="employees-subtitle">Manage and view all employee information</p>
        </div>
        <button className="add-employee-button">
          <UserPlus size={16} />
          <span>Add Employee</span>
        </button>
      </div>
      
      <div className="employees-actions">
        <div className="search-container">
          <Search size={16} />
          <input type="text" placeholder="Search employees..." />
        </div>
        
        <button className="filter-button">
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>
      
      <div className="employees-table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Performance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td className="employee-name">{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>
                  <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                    {employee.status}
                  </span>
                </td>
                <td>{formatDate(employee.joinDate)}</td>
                <td>
                  <div className="performance-container">
                    <div className="performance-bar" style={{ width: `${employee.performance}%`, backgroundColor: getPerformanceColor(employee.performance) }}></div>
                    <span>{employee.performance}%</span>
                  </div>
                </td>
                <td>
                  <button className="action-button">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <button className="pagination-button" disabled>Previous</button>
        <div className="pagination-numbers">
          <button className="pagination-number active">1</button>
          <button className="pagination-number">2</button>
          <button className="pagination-number">3</button>
          <span>...</span>
          <button className="pagination-number">10</button>
        </div>
        <button className="pagination-button">Next</button>
      </div>
    </div>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
}

function getPerformanceColor(value: number): string {
  if (value >= 90) return 'var(--success-500)';
  if (value >= 80) return 'var(--primary-500)';
  if (value >= 70) return 'var(--warning-500)';
  return 'var(--error-500)';
}

export default Employees;