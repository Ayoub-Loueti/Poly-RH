import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './KpiCard.css';

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon,
  color
}) => {
  return (
    <div className="kpi-card">
      <div className="kpi-icon" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <div className="kpi-content">
        <h3 className="kpi-title">{title}</h3>
        <p className="kpi-value">{value}</p>
        <div className={`kpi-change ${changeType}`}>
          {changeType === 'positive' ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}
          <span>{change}% from last month</span>
        </div>
      </div>
    </div>
  );
};

export default KpiCard;