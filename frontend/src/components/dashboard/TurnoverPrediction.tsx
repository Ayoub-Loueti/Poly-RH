import React from 'react';
import './TurnoverPrediction.css';

const employeesAtRisk = [
  { 
    id: 'EMP192', 
    name: 'John Doe', 
    department: 'Engineering',
    riskScore: 85,
    factors: ['Low performance reviews', 'High work hours', 'No promotion in 2 years']
  },
  { 
    id: 'EMP045', 
    name: 'Jane Smith', 
    department: 'Marketing',
    riskScore: 72,
    factors: ['Recent negative feedback', 'Salary below market']
  },
  { 
    id: 'EMP371', 
    name: 'Michael Brown', 
    department: 'Sales',
    riskScore: 68,
    factors: ['High number of late arrivals', 'Low engagement scores']
  }
];

const TurnoverPrediction: React.FC = () => {
  return (
    <div className="turnover-prediction">
      <div className="risk-summary">
        <div className="risk-metrics">
          <div className="risk-metric">
            <span className="risk-metric-value">7</span>
            <span className="risk-metric-label">Employees at high risk</span>
          </div>
          <div className="risk-metric">
            <span className="risk-metric-value">12</span>
            <span className="risk-metric-label">Employees at medium risk</span>
          </div>
          <div className="risk-metric">
            <span className="risk-metric-value">83%</span>
            <span className="risk-metric-label">Prediction accuracy</span>
          </div>
        </div>
      </div>
      
      <h4 className="risk-section-title">Top At-Risk Employees</h4>
      
      <div className="risk-employees">
        {employeesAtRisk.map((employee, index) => (
          <div className="risk-employee-card" key={index}>
            <div className="risk-employee-header">
              <div className="risk-employee-info">
                <h4>{employee.name}</h4>
                <p>{employee.department} • {employee.id}</p>
              </div>
              <div className="risk-score">
                <div className="risk-score-circle" style={{ 
                  background: `conic-gradient(
                    var(--error-500) ${employee.riskScore}%, 
                    var(--neutral-200) 0%
                  )` 
                }}>
                  <span>{employee.riskScore}%</span>
                </div>
              </div>
            </div>
            
            <div className="risk-factors">
              <h5>Risk Factors</h5>
              <ul>
                {employee.factors.map((factor, factorIndex) => (
                  <li key={factorIndex}>{factor}</li>
                ))}
              </ul>
            </div>
            
            <button className="intervention-button">Plan Intervention</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TurnoverPrediction;