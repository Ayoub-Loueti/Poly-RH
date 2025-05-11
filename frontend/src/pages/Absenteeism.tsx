import React, { useState, useEffect } from 'react';
import { Clock, Calendar, BarChart } from 'lucide-react';
import axios from 'axios';
import VisualizationCard from '../components/dashboard/VisualizationCard';
import FilterBar from '../components/common/FilterBar';
import AbsenceTypeDistribution from '../components/dashboard/AbsenceTypeDistribution';
import '../styles/Absenteeism.css';

const Absenteeism: React.FC = () => {
  const [absenceStats, setAbsenceStats] = useState<{
    averageAbsenceRate: string;
    rateChange: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbsenceStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/absences/stats');
        setAbsenceStats(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching absence stats:', err);
        setError('Failed to fetch absence statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchAbsenceStats();
  }, []);

  return (
    <div className="absenteeism-page">
      <div className="absenteeism-header">
        <div>
          <h1>Absenteeism Analysis</h1>
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

        <VisualizationCard 
          title="Monthly Trend" 
          subtitle="Last 12 months"
          icon={<Calendar size={18} />}
        >
          <div className="chart-placeholder line-chart">
            <div className="line-segment"></div>
            <div className="line-segment up"></div>
            <div className="line-segment down"></div>
          </div>
        </VisualizationCard>
      </div>
    </div>
  );
};

export default Absenteeism;