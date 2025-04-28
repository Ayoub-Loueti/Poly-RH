import React from 'react';
import { Clock, Calendar, BarChart } from 'lucide-react';
import VisualizationCard from '../components/dashboard/VisualizationCard';
import FilterBar from '../components/common/FilterBar';
import '../styles/Absenteeism.css';

const Absenteeism: React.FC = () => {
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
          <div className="metric-value">4.2%</div>
          <div className="metric-change negative">+0.8% from last month</div>
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
          title="Absence Distribution" 
          subtitle="By department"
          icon={<BarChart size={18} />}
          className="span-2"
        >
          <div className="chart-placeholder bar-chart">
            <div className="bar-container">
              <div className="bar" style={{ height: '65%' }}></div>
              <div className="bar" style={{ height: '85%' }}></div>
              <div className="bar" style={{ height: '45%' }}></div>
              <div className="bar" style={{ height: '75%' }}></div>
              <div className="bar" style={{ height: '55%' }}></div>
            </div>
          </div>
        </VisualizationCard>

        <VisualizationCard 
          title="Absence Types" 
          subtitle="Distribution by category"
          icon={<Clock size={18} />}
        >
          <div className="chart-placeholder pie-chart">
            <div className="pie-segment s1"></div>
            <div className="pie-segment s2"></div>
            <div className="pie-segment s3"></div>
            <div className="pie-segment s4"></div>
          </div>
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