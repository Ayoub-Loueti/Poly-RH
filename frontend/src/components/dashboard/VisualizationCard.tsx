import React, { ReactNode } from 'react';
import './VisualizationCard.css';

interface VisualizationCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  onTimeFilterChange?: (filter: string) => void;
}

const VisualizationCard: React.FC<VisualizationCardProps> = ({
  title,
  subtitle,
  icon,
  children,
  className = '',
  onTimeFilterChange
}) => {
  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onTimeFilterChange) {
      onTimeFilterChange(event.target.value);
    }
  };

  return (
    <div className={`visualization-card ${className}`}>
      <div className="visualization-header">
        <div className="visualization-title">
          {icon && <span className="visualization-icon">{icon}</span>}
          <div>
            <h3>{title}</h3>
            {subtitle && <p className="visualization-subtitle">{subtitle}</p>}
          </div>
        </div>
        <div className="visualization-actions">
          <select className="time-selector" onChange={handleTimeChange} defaultValue="all">
            <option value="all">All time</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>
      <div className="visualization-content">
        {children}
      </div>
    </div>
  );
};

export default VisualizationCard;