import React from 'react';
import './DepartmentComparison.css';

const departmentData = [
  { department: 'Engineering', performance: 87, turnover: 8, headcount: 120 },
  { department: 'Marketing', performance: 82, turnover: 15, headcount: 45 },
  { department: 'Sales', performance: 91, turnover: 12, headcount: 78 },
  { department: 'HR', performance: 89, turnover: 5, headcount: 23 },
  { department: 'Finance', performance: 85, turnover: 6, headcount: 34 },
];

const DepartmentComparison: React.FC = () => {
  return (
    <div className="department-comparison">
      <div className="comparison-header">
        <div className="comparison-column">Department</div>
        <div className="comparison-column">Performance</div>
        <div className="comparison-column">Turnover</div>
        <div className="comparison-column">Headcount</div>
      </div>
      
      <div className="comparison-body">
        {departmentData.map((dept, index) => (
          <div className="comparison-row" key={index}>
            <div className="comparison-cell department">{dept.department}</div>
            <div className="comparison-cell">
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${dept.performance}%`,
                    backgroundColor: getPerformanceColor(dept.performance)
                  }}
                ></div>
                <span>{dept.performance}%</span>
              </div>
            </div>
            <div className="comparison-cell">
              <span className={getTurnoverClass(dept.turnover)}>
                {dept.turnover}%
              </span>
            </div>
            <div className="comparison-cell">{dept.headcount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getPerformanceColor(value: number): string {
  if (value >= 90) return 'var(--success-500)';
  if (value >= 80) return 'var(--primary-500)';
  if (value >= 70) return 'var(--warning-500)';
  return 'var(--error-500)';
}

function getTurnoverClass(value: number): string {
  if (value <= 5) return 'turnover-low';
  if (value <= 10) return 'turnover-medium';
  return 'turnover-high';
}

export default DepartmentComparison;