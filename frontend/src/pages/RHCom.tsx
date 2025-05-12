import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search, Filter, MoreHorizontal } from 'lucide-react';
import '../styles/Employees.css';

const USER_STORAGE_KEY = 'polyrh_user';

interface User {
  id_user: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  hire_date: string;
  department_id: number;
  position: string;
  salary: number;
  isValid: number;
  role: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const RHCom: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
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
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    if (!userData) {
      navigate('/login');
      return;
    }
    fetchRHUsers(currentPage);
  }, [navigate, currentPage]);

  const fetchRHUsers = async (page: number) => {
    try {
      const response = await fetch(`http://localhost:5000/employees/rhemploye?page=${page}&limit=10`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.employees.filter((user: any) => user.role === 'Rh'));
      setPaginationInfo(data.pagination);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleBlockToggle = async (id_user: number) => {
    try {
      const response = await fetch('http://localhost:5000/users/block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_user }),
      });
      if (!response.ok) {
        throw new Error('Failed to toggle block status');
      }
      //       const data = await response.json();
      // Update the employee in the state
      setUsers((prev) =>
        prev.map((user) =>
          user.id_user === id_user ? { ...user, isValid: user.isValid === 1 ? 0 : 1 } : user
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
          <h1>RH Community</h1>
          <p className="employees-subtitle">Manage and view all RH users</p>
        </div>
        <button className="add-employee-button">
          <UserPlus size={16} />
          <span>Add RH</span>
        </button>
      </div>
      <div className="employees-actions">
        <div className="search-container">
          <Search size={16} />
          <input type="text" placeholder="Search RH..." />
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
            {users.map((user) => (
              <tr key={user.id_user}>
                <td>{user.id_user}</td>
                <td className="employee-name">{`${user.first_name} ${user.last_name}`}</td>
                <td>{formatDate(user.birth_date)}</td>
                <td>{formatDate(user.hire_date)}</td>
                <td>{user.department_id}</td>
                <td>{user.position}</td>
                <td>${user.salary.toLocaleString()}</td>
                <td>
                                  <button className="action-button" onClick={() => handleBlockToggle(user.id_user)}
                                    style={{
                                      backgroundColor: user.isValid === 1 ? '#e74c3c' : '#27ae60',
                                      color: 'white',
                                      border: 'none',
                                      borderRadius: '4px',
                                      padding: '4px 10px',
                                      marginRight: '8px',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    {user.isValid === 1 ? 'Block' : 'Unblock'}
                                  </button>
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
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
}

export default RHCom;
