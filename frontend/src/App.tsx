import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import RHCom from './pages/RHCom';
import Turnover from './pages/Turnover';
import Absenteeism from './pages/Absenteeism';
import Performance from './pages/Performance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { RequestProvider } from './context/RequestContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

import MainLayout from './components/layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import AbsenceRequestPage from './pages/AbsenceRequestPage';
import HRMessagePage from './pages/HRMessagePage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Admin/RH Routes */}
            <Route path="/admin" element={<ProtectedRoute element={<Layout />} allowedRoles={['admin', 'Rh']} />}>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="RHCom" element={<RHCom />} />
              <Route path="turnover" element={<Turnover />} />
              <Route path="absenteeism" element={<Absenteeism />} />
              <Route path="performance" element={<Performance />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Employee Routes */}
            <Route 
              path="/employee" 
              element={
                <ProtectedRoute 
                  element={
                    <RequestProvider>
                      <MainLayout />
                    </RequestProvider>
                  } 
                  allowedRoles={['employe']} 
                />
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="absence" element={<AbsenceRequestPage />} />
              <Route path="hr-message" element={<HRMessagePage />} />
            </Route>

            {/* Redirect root to appropriate dashboard based on role */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
