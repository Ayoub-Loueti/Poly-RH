import React from 'react';
import { Award, BarChart, TrendingUp } from 'lucide-react';
import VisualizationCard from '../components/dashboard/VisualizationCard';
import FilterBar from '../components/common/FilterBar';
import '../styles/Performance.css';

const Performance: React.FC = () => {
  return (
    <div className="performance-page">
      <div className="performance-header">
        <div>
          <h1>Performance Management</h1>
          <p className="performance-subtitle">Track and analyze employee performance metrics</p>
        </div>
        <FilterBar />
      </div>

      <div className="performance-metrics">
        <div className="metric-card">
          <h3>Average Performance Score</h3>
          <div className="metric-value">86.3%</div>
          <div className="metric-change positive">+2.1% from last quarter</div>
        </div>
        <div className="metric-card">
          <h3>High Performers</h3>
          <div className="metric-value">142</div>
          <div className="metric-change positive">+12 from last quarter</div>
        </div>
        <div className="metric-card">
          <h3>Needs Improvement</h3>
          <div className="metric-value">28</div>
          <div className="metric-change negative">+5 from last quarter</div>
        </div>
      </div>

      <div className="visualization-grid">
        <VisualizationCard 
          title="Performance Distribution" 
          subtitle="By department"
          icon={<BarChart size={18} />}
          className="span-2"
        >
          <div className="chart-placeholder bar-chart">
            <div className="bar-container">
              <div className="bar" style={{ height: '85%' }}></div>
              <div className="bar" style={{ height: '92%' }}></div>
              <div className="bar" style={{ height: '78%' }}></div>
              <div className="bar" style={{ height: '88%' }}></div>
              <div className="bar" style={{ height: '82%' }}></div>
            </div>
          </div>
        </VisualizationCard>

        <VisualizationCard 
          title="Performance Trends" 
          subtitle="Quarterly comparison"
          icon={<TrendingUp size={18} />}
        >
          <div className="chart-placeholder line-chart">
            <div className="line-segment"></div>
            <div className="line-segment up"></div>
            <div className="line-segment up"></div>
          </div>
        </VisualizationCard>

        <VisualizationCard 
          title="Rating Distribution" 
          subtitle="By performance level"
          icon={<Award size={18} />}
        >
          <div className="chart-placeholder pie-chart">
            <div className="pie-segment s1"></div>
            <div className="pie-segment s2"></div>
            <div className="pie-segment s3"></div>
            <div className="pie-segment s4"></div>
          </div>
        </VisualizationCard>
      </div>
    </div>
  );
};

export default Performance;