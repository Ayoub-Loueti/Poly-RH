import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search, Filter, MoreHorizontal, X, Archive, Trash2, RotateCcw } from 'lucide-react';
import '../styles/Employees.css';

// Use the same key as in Login component
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
  genre_employee: 'homme' | 'femme';
  isArchived: number;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const Employees: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const [newEmployee, setNewEmployee] = useState<Omit<User, 'id_user' | 'isValid' | 'role' | 'isArchived'>>({
    first_name: '',
    last_name: '',
    birth_date: '',
    hire_date: '',
    department_id: 1,
    position: '',
    salary: 0,
    genre_employee: 'homme'
  });
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const navigate = useNavigate();

  const fetchEmployees = async (page: number, search: string = '') => {
    try {
      console.log('Fetching employees with params:', { page, showArchived, search });
      const response = await fetch(`http://localhost:5000/employees?page=${page}&limit=10&archived=${showArchived ? 1 : 0}&search=${encodeURIComponent(search)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      console.log('Raw API response:', data);
      
      setUsers(data.employees);
      setPaginationInfo(data.pagination);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout to debounce the search
    const timeout = window.setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
      fetchEmployees(1, value);
    }, 500); // Wait 500ms after user stops typing

    setSearchTimeout(timeout);
  };

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    if (!userData) {
      navigate('/login');
      return;
    }

    // Parse user data to get role
    try {
      const parsedUserData = JSON.parse(userData);
      setUserRole(parsedUserData.role);
    } catch (err) {
      console.error('Error parsing user data:', err);
    }

    fetchEmployees(currentPage, searchTerm);
  }, [navigate, currentPage, showArchived]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

  const handleAddEmployee = async () => {
    try {
      const response = await fetch('http://localhost:5000/employees/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add employee');
      }

      const data = await response.json();
      
      // Refresh the employee list
      await fetchEmployees(currentPage);
      
      // Close the form and reset
      setShowAddForm(false);
      setNewEmployee({
        first_name: '',
        last_name: '',
        birth_date: '',
        hire_date: '',
        department_id: 1,
        position: '',
        salary: 0,
        genre_employee: 'homme'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while adding employee');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: name === 'department_id' || name === 'salary' ? parseInt(value) : value
    }));
  };

  const handleArchiveEmployee = async (id_user: number) => {
    try {
      console.log('Attempting to archive employee with ID:', id_user);
      
      const response = await fetch('http://localhost:5000/employees/archive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_user }),
      });

      console.log('Archive response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Archive error:', errorData);
        throw new Error(errorData.message || 'Failed to archive employee');
      }

      const data = await response.json();
      console.log('Archive successful:', data);

      // Fetch fresh data after archiving
      await fetchEmployees(currentPage);
      
    } catch (err) {
      console.error('Archive error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while archiving employee');
    }
  };

  const handleRestoreEmployee = async (id_user: number) => {
    try {
      console.log('Attempting to restore employee with ID:', id_user);
      
      const response = await fetch('http://localhost:5000/employees/restore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_user }),
      });

      console.log('Restore response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Restore error:', errorData);
        throw new Error(errorData.message || 'Failed to restore employee');
      }

      const data = await response.json();
      console.log('Restore successful:', data);

      // Fetch fresh data after restoring
      await fetchEmployees(currentPage);
      
    } catch (err) {
      console.error('Restore error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while restoring employee');
    }
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

  console.log('About to render table. Users state:', users);
  console.log('Current userRole:', userRole);
  console.log('Current showArchived:', showArchived);

  return (
    <div className="employees-page">
      <div className="employees-header">
        <div>
          <h1>Employees</h1>
          <p className="employees-subtitle">Manage and view all employee information</p>
        </div>
        <div className="header-buttons">
          {userRole === 'Rh' && (
            <>
              <button 
                className="add-employee-button"
                onClick={() => setShowAddForm(true)}
              >
                <UserPlus size={16} />
                <span>Add Employee</span>
              </button>
              <button 
                className={`archive-button ${showArchived ? 'active' : ''}`}
                onClick={() => setShowArchived(!showArchived)}
              >
                <Archive size={16} />
                <span>{showArchived ? 'Active Employees' : 'Archived Employees'}</span>
              </button>
            </>
          )}
        </div>
      </div>
      
      {showAddForm && (
        <div className="add-employee-form-container">
          <div className="add-employee-form">
            <div className="form-header">
              <h2>Add New Employee</h2>
              <button 
                className="close-button"
                onClick={() => setShowAddForm(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={newEmployee.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={newEmployee.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Birth Date</label>
                <input
                  type="date"
                  name="birth_date"
                  value={newEmployee.birth_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Hire Date</label>
                <input
                  type="date"
                  name="hire_date"
                  value={newEmployee.hire_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <select
                  name="department_id"
                  value={newEmployee.department_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">Finance</option>
                  <option value="2">HR</option>
                  <option value="3">Sales</option>
                   <option value="3">Marketing</option>
                    <option value="3">Engineering</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={newEmployee.position}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={newEmployee.salary}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="genre_employee"
                  value={newEmployee.genre_employee}
                  onChange={handleInputChange}
                  required
                >
                  <option value="homme">Male</option>
                  <option value="femme">Female</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button 
                className="submit-button"
                onClick={handleAddEmployee}
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="employees-actions">
        <div className="search-container">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search employees by name..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <button className="filter-button">
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>
      
      <div className="employees-table-container">
        {users && users.length > 0 ? (
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
                {userRole === 'admin' ? (
                  <th>Block Status</th>
                ) : (
                  <>
                    <th>Actions</th>
                    <th>Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                console.log('Rendering user:', user);
                return (
                  <tr key={user.id_user} className="employee-row">
                    <td>{user.id_user}</td>
                    <td className="employee-name">{`${user.first_name} ${user.last_name}`}</td>
                    <td>{formatDate(user.birth_date)}</td>
                    <td>{formatDate(user.hire_date)}</td>
                    <td>{user.department_id}</td>
                    <td>{user.position}</td>
                    <td>${Number(user.salary).toLocaleString()}</td>
                    {userRole === 'admin' ? (
                      <td>
                        <button 
                          className="action-button block" 
                          onClick={() => handleBlockToggle(user.id_user)}
                          style={{
                            backgroundColor: user.isValid === 1 ? '#e74c3c' : '#27ae60',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 10px',
                            cursor: 'pointer',
                          }}
                        >
                          {user.isValid === 1 ? 'Block' : 'Unblock'}
                        </button>
                      </td>
                    ) : (
                      <>
                        <td>
                          {userRole === 'Rh' && !showArchived && (
                            <button 
                              className="action-button block" 
                              onClick={() => handleBlockToggle(user.id_user)}
                              style={{
                                backgroundColor: user.isValid === 1 ? '#e74c3c' : '#27ae60',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '4px 10px',
                                cursor: 'pointer',
                              }}
                            >
                              {user.isValid === 1 ? 'Block' : 'Unblock'}
                            </button>
                          )}
                        </td>
                        <td>
                          {userRole === 'Rh' && !showArchived && (
                            <button 
                              className="action-button archive"
                              onClick={() => handleArchiveEmployee(user.id_user)}
                              title="Archive Employee"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                          {showArchived && (
                            <button 
                              className="action-button restore"
                              onClick={() => handleRestoreEmployee(user.id_user)}
                              title="Restore Employee"
                            >
                              <RotateCcw size={16} />
                            </button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="no-data-message">
            {showArchived ? 'No archived employees found' : 'No active employees found'}
          </div>
        )}
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

// Add these styles to ensure the table is visible
const styles = `
.employees-table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  overflow: auto;
}

.employees-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.employees-table th,
.employees-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.employees-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.employee-row:hover {
  background-color: #f9fafb;
}

.no-data-message {
  padding: 40px;
  text-align: center;
  color: #6b7280;
  font-size: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
  margin: 20px 0;
}
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Employees;