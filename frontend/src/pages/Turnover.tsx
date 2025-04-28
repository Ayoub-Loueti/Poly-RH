import React from 'react';
import { BarChart, TrendingDown } from 'lucide-react';
import VisualizationCard from '../components/dashboard/VisualizationCard';
import FilterBar from '../components/common/FilterBar';
import '../styles/Turnover.css';

const Turnover: React.FC = () => {
  return (
    <div className="turnover-page">
      <div className="turnover-header">
        <div>
          <h1>Employee Turnover</h1>
          <p className="turnover-subtitle">Track and analyze employee turnover patterns</p>
        </div>
        <FilterBar />
      </div>

      <div className="turnover-metrics">
        <div className="metric-card">
          <h3>Annual Turnover Rate</h3>
          <div className="metric-value">12.4%</div>
          <div className="metric-change negative">+2.1% from last year</div>
        </div>
        <div className="metric-card">
          <h3>Voluntary Turnover</h3>
          <div className="metric-value">8.2%</div>
          <div className="metric-change negative">+1.5% from last year</div>
        </div>
        <div className="metric-card">
          <h3>Involuntary Turnover</h3>
          <div className="metric-value">4.2%</div>
          <div className="metric-change negative">+0.6% from last year</div>
        </div>
      </div>

      <div className="visualization-grid">
        <VisualizationCard 
          title="Turnover by Department" 
          subtitle="Last 12 months"
          icon={<BarChart size={18} />}
          className="span-2"
        >
          <div className="chart-placeholder bar-chart">
            <div className="bar-container">
              <div className="bar" style={{ height: '75%' }}></div>
              <div className="bar" style={{ height: '45%' }}></div>
              <div className="bar" style={{ height: '60%' }}></div>
              <div className="bar" style={{ height: '30%' }}></div>
              <div className="bar" style={{ height: '55%' }}></div>
            </div>
          </div>
        </VisualizationCard>

        <VisualizationCard 
          title="Turnover Trends" 
          subtitle="Monthly comparison"
          icon={<TrendingDown size={18} />}
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

export default Turnover;