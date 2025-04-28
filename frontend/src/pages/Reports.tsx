import React from 'react';
import { FileText, Download, Filter } from 'lucide-react';
import '../styles/Reports.css';

const Reports: React.FC = () => {
  const reports = [
    {
      id: 1,
      name: 'Monthly HR Overview',
      description: 'Complete overview of HR metrics and KPIs',
      type: 'Monthly',
      lastGenerated: '2024-03-15',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Turnover Analysis',
      description: 'Detailed analysis of employee turnover trends',
      type: 'Quarterly',
      lastGenerated: '2024-03-01',
      format: 'Excel'
    },
    {
      id: 3,
      name: 'Performance Review Summary',
      description: 'Summary of employee performance reviews',
      type: 'Quarterly',
      lastGenerated: '2024-03-10',
      format: 'PDF'
    },
    {
      id: 4,
      name: 'Department Headcount',
      description: 'Breakdown of employees by department',
      type: 'Weekly',
      lastGenerated: '2024-03-18',
      format: 'Excel'
    }
  ];

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h1>Reports</h1>
          <p className="reports-subtitle">Generate and download HR reports</p>
        </div>
        <button className="generate-report-button">
          <FileText size={16} />
          <span>Generate New Report</span>
        </button>
      </div>

      <div className="reports-filters">
        <div className="search-container">
          <input type="text" placeholder="Search reports..." />
        </div>
        <button className="filter-button">
          <Filter size={16} />
          <span>Filter</span>
        </button>
      </div>

      <div className="reports-grid">
        {reports.map((report) => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <div className="report-icon">
                <FileText size={24} />
              </div>
              <div className="report-type">{report.type}</div>
            </div>
            
            <div className="report-content">
              <h3>{report.name}</h3>
              <p>{report.description}</p>
              
              <div className="report-meta">
                <div className="meta-item">
                  <span className="meta-label">Last Generated:</span>
                  <span>{new Date(report.lastGenerated).toLocaleDateString()}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Format:</span>
                  <span>{report.format}</span>
                </div>
              </div>
            </div>
            
            <button className="download-button">
              <Download size={16} />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;