import React, { useState, useEffect } from 'react';
import { Clock, Calendar, BarChart, Check, X } from 'lucide-react';
import axios from 'axios';
import VisualizationCard from '../components/dashboard/VisualizationCard';
import FilterBar from '../components/common/FilterBar';
import AbsenceTypeDistribution from '../components/dashboard/AbsenceTypeDistribution';
import '../styles/Absenteeism.css';

interface Absence {
  absence_id: number;
  id_user: number;
  start_date: string;
  end_date: string;
  absence_type: string;
  isAbOk: string;
}

const Absenteeism: React.FC = () => {
  const [absenceStats, setAbsenceStats] = useState<{
    averageAbsenceRate: string;
    rateChange: string;
  } | null>(null);
  const [pendingAbsences, setPendingAbsences] = useState<Absence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAbsenceStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/absences/stats');
      setAbsenceStats(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching absence stats:', err);
      setError('Failed to fetch absence statistics');
    }
  };

  const fetchPendingAbsences = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/absences/pending');
      setPendingAbsences(response.data.data);
    } catch (err) {
      console.error('Error fetching pending absences:', err);
      setError('Failed to fetch pending absences');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (absenceId: number, status: 'accepter' | 'refuser') => {
    try {
      await axios.post('http://localhost:5000/api/absences/update-status', {
        absence_id: absenceId,
        status: status
      });
      // Refresh the pending absences list
      fetchPendingAbsences();
    } catch (err) {
      console.error('Error updating absence status:', err);
      setError('Failed to update absence status');
    }
  };

  useEffect(() => {
    fetchAbsenceStats();
    fetchPendingAbsences();
  }, []);

  return (
    <div className="absenteeism-page">
      <div className="absenteeism-header">
        <div>
          <h1>Absenteeism Analysis</h1>
          <br></br>
          <p className="absenteeism-subtitle">Monitor and analyze employee absence patterns</p>
        </div>
        <FilterBar />
      </div>

      <div className="absenteeism-metrics">
        <div className="metric-card">
          <h3>Overall Absence Rate</h3>
          {loading ? (
            <div className="metric-value">Loading...</div>
          ) : error ? (
            <div className="metric-value error">{error}</div>
          ) : (
            <>
              <div className="metric-value">{absenceStats?.averageAbsenceRate}%</div>
              <div className={`metric-change ${Number(absenceStats?.rateChange) >= 0 ? 'negative' : 'positive'}`}>
                {Number(absenceStats?.rateChange) >= 0 ? '+' : ''}{absenceStats?.rateChange}% from last month
              </div>
            </>
          )}
        </div>
        <div className="metric-card">
          <h3>Average Days/Employee</h3>
          <div className="metric-value">8.5</div>
          <div className="metric-change negative">+1.2 days from last month</div>
        </div>
        <div className="metric-card">
          <h3>Cost Impact</h3>
          <div className="metric-value">$45.2K</div>
          <div className="metric-change negative">+12% from last month</div>
        </div>
      </div>

      <div className="visualization-grid">
        <VisualizationCard 
          title="Absence Types" 
          subtitle="Distribution by type"
          icon={<BarChart size={18} />}
          className="span-2"
        >
          <AbsenceTypeDistribution />
        </VisualizationCard>

        <div className="pending-absences-card">
          <h2>Pending Absence Requests</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="absences-table-container">
              <table className="absences-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingAbsences.map((absence) => (
                    <tr key={absence.absence_id}>
                      <td>{absence.id_user}</td>
                      <td>{new Date(absence.start_date).toLocaleDateString()}</td>
                      <td>{new Date(absence.end_date).toLocaleDateString()}</td>
                      <td>{absence.absence_type}</td>
                      <td className="action-buttons">
                        <button
                          className="accept-button"
                          onClick={() => handleStatusUpdate(absence.absence_id, 'accepter')}
                        >
                          <Check size={16} />
                          Accept
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => handleStatusUpdate(absence.absence_id, 'refuser')}
                        >
                          <X size={16} />
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Absenteeism;