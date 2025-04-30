import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search, Filter, MoreHorizontal } from 'lucide-react';
import '../styles/Employees.css';

// Use the same key as in Login component
const USER_STORAGE_KEY = 'polyrh_user';

interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  hire_date: string;
  department_id: number;
  position: string;
  salary: number;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    if (!userData) {
      navigate('/login');
      return;
    }

    fetchEmployees(currentPage);
  }, [navigate, currentPage]);

  const fetchEmployees = async (page: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees?page=${page}&limit=10`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      setEmployees(data.employees);
      setPaginationInfo(data.pagination);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(paginationInfo.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-number ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
              <th>ID</th>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Hire Date</th>
              <th>Department ID</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.employee_id}</td>
                <td className="employee-name">{`${employee.first_name} ${employee.last_name}`}</td>
                <td>{formatDate(employee.birth_date)}</td>
                <td>{formatDate(employee.hire_date)}</td>
                <td>{employee.department_id}</td>
                <td>{employee.position}</td>
                <td>${employee.salary.toLocaleString()}</td>
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
        <button 
          className="pagination-button" 
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <div className="pagination-numbers">
          {renderPaginationNumbers()}
        </div>
        <button 
          className="pagination-button"
          disabled={currentPage === paginationInfo.totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
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

export default Employees;