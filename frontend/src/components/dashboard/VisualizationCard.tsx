import React, { ReactNode } from 'react';
import './VisualizationCard.css';

interface VisualizationCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const VisualizationCard: React.FC<VisualizationCardProps> = ({
  title,
  subtitle,
  icon,
  children,
  className = ''
}) => {
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
          <select className="time-selector">
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
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