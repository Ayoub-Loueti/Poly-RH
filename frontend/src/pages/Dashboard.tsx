import React from 'react';
import { BarChart, LineChart, PieChart, ArrowUpRight, ArrowDownRight, Users, Calendar, TrendingDown, Award } from 'lucide-react';
import KpiCard from '../components/dashboard/KpiCard';
import VisualizationCard from '../components/dashboard/VisualizationCard';
import DepartmentComparison from '../components/dashboard/DepartmentComparison';
import TurnoverPrediction from '../components/dashboard/TurnoverPrediction';
import FilterBar from '../components/common/FilterBar';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>HR Analytics Dashboard</h1>
          <p className="dashboard-subtitle">Overview of key HR performance indicators</p>
        </div>
        <FilterBar />
      </div>
      
      <div className="kpi-cards">
        <KpiCard 
          title="Turnover Rate"
          value="12.4%"
          change={1.2}
          changeType="negative"
          icon={<TrendingDown size={24} />}
          color="var(--error-500)"
        />
        <KpiCard 
          title="Absenteeism"
          value="4.2%"
          change={0.8}
          changeType="negative" 
          icon={<Calendar size={24} />}
          color="var(--warning-500)"
        />
        <KpiCard 
          title="Performance"
          value="86.3%"
          change={2.1}
          changeType="positive"
          icon={<Award size={24} />}
          color="var(--success-500)"
        />
        <KpiCard 
          title="Headcount"
          value="532"
          change={4}
          changeType="positive"
          icon={<Users size={24} />}
          color="var(--primary-500)"
        />
      </div>
      
      <div className="visualization-grid">
        <VisualizationCard 
          title="Turnover Trend" 
          subtitle="Last 12 months"
          icon={<LineChart size={18} />}
          className="span-2"
        >
          <div className="chart-placeholder line-chart">
            <div className="line-segment"></div>
            <div className="line-segment up"></div>
            <div className="line-segment down"></div>
            <div className="line-segment"></div>
            <div className="line-segment up"></div>
            <div className="line-segment down-sharp"></div>
          </div>
        </VisualizationCard>
        
        <VisualizationCard 
          title="Department Distribution" 
          subtitle="Active employees"
          icon={<PieChart size={18} />}
        >
          <div className="chart-placeholder pie-chart">
            <div className="pie-segment s1"></div>
            <div className="pie-segment s2"></div>
            <div className="pie-segment s3"></div>
            <div className="pie-segment s4"></div>
          </div>
        </VisualizationCard>
        
        <VisualizationCard 
          title="Age Distribution" 
          subtitle="By age groups"
          icon={<BarChart size={18} />}
        >
          <div className="chart-placeholder bar-chart">
            <div className="bar-container">
              <div className="bar" style={{ height: '30%' }}></div>
              <div className="bar" style={{ height: '70%' }}></div>
              <div className="bar" style={{ height: '95%' }}></div>
              <div className="bar" style={{ height: '60%' }}></div>
              <div className="bar" style={{ height: '40%' }}></div>
            </div>
          </div>
        </VisualizationCard>
        
        <VisualizationCard 
          title="Department Performance" 
          subtitle="Comparative analysis"
          icon={<BarChart size={18} />}
          className="span-2"
        >
          <DepartmentComparison />
        </VisualizationCard>
        
        <VisualizationCard 
          title="Turnover Prediction" 
          subtitle="Risk analysis"
          icon={<TrendingDown size={18} />}
          className="span-2"
        >
          <TurnoverPrediction />
        </VisualizationCard>
      </div>
    </div>
  );
};

export default Dashboard;