import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { PieChart as PieChartIcon } from 'lucide-react';
import axios from 'axios';
import './DepartmentDistribution.css';

interface DepartmentData {
  department_id: number;
  department_name: string;
  user_count: number;
  percentage: string;
}

interface DepartmentDistributionProps {
  timeFilter: string;
}

const DepartmentDistribution: React.FC<DepartmentDistributionProps> = ({ timeFilter }) => {
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartmentStats = async (filter: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/dashboard/depStats?filter=${filter}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.data && Array.isArray(response.data.data)) {
        setDepartmentData(response.data.data);
        setError(null);
      } else {
        console.error('Invalid response format:', response.data);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching department stats:', err);
      setError('Failed to fetch department statistics. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartmentStats(timeFilter);
  }, [timeFilter]);

  if (loading) {
    return <div className="loading">Loading department statistics...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!departmentData || departmentData.length === 0) {
    return <div className="error">No department data available</div>;
  }

  const chartData = departmentData.map(dept => ({
    id: dept.department_name,
    label: dept.department_name,
    value: dept.user_count,
    percentage: dept.percentage
  }));

  return (
    <div className="department-distribution">
      <div className="distribution-header">
        <PieChartIcon size={18} />
        <h3>Department Distribution</h3>
      </div>
      
      <div className="pie-chart-container">
        <ResponsivePie
          data={chartData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.25}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]]
          }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000'
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </div>
  );
};

export default DepartmentDistribution; 