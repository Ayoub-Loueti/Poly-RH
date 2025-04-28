import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Lock, Mail, AlertCircle } from 'lucide-react';
import '../styles/Login.css';

// Use the same key as in AuthContext
const USER_STORAGE_KEY = 'polyrh_user';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    if (userData) {
      try {
        // Verify that the stored data is valid JSON
        JSON.parse(userData);
        navigate('/');
      } catch (e) {
        // If JSON parsing fails, clear the invalid data
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_user: email,
          motDePasse: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Login successful
      console.log('Login successful:', data);
      
      // Store user data in localStorage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <BarChart2 size={36} />
            <h1>PolyRH</h1>
          </div>
          <p className="login-subtitle">Human Resources Analytics Dashboard</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <Mail size={18} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <Lock size={18} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo credentials:</p>
          <p>Email: admin@example.com</p>
          <p>Password: password</p>
        </div>
      </div>

      <div className="login-features">
        <div className="features-content">
          <h2>Analytical HR Management</h2>
          <p>Transforming HR data into actionable insights for better decision making</p>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon" style={{ backgroundColor: 'rgba(0, 98, 255, 0.1)' }}>
                <BarChart2 size={24} color="var(--primary-500)" />
              </div>
              <div className="feature-text">
                <h3>Predictive Analytics</h3>
                <p>Forecast turnover and identify at-risk employees</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon" style={{ backgroundColor: 'rgba(40, 199, 111, 0.1)' }}>
                <Lock size={24} color="var(--success-500)" />
              </div>
              <div className="feature-text">
                <h3>Secure Access</h3>
                <p>Role-based permissions and data protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;