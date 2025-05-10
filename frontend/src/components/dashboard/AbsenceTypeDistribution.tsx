import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';

interface AbsenceTypeData {
  absence_type: string;
  count: number;
  [key: string]: string | number;
}

const AbsenceTypeDistribution: React.FC = () => {
  const [data, setData] = useState<AbsenceTypeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbsenceTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/absences/types');
        console.log('Absence types data:', response.data);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching absence types:', err);
        setError('Failed to fetch absence type data');
        setLoading(false);
      }
    };

    fetchAbsenceTypes();
  }, []);

  if (loading) return <div className="loading">Loading absence type distribution...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data.length) return <div className="no-data">No absence data available</div>;

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={['count']}
        indexBy="absence_type"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Absence Type',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Count',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        animate={true}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: "#666"
              }
            },
            legend: {
              text: {
                fill: "#666"
              }
            }
          },
          grid: {
            line: {
              stroke: "#ddd"
            }
          }
        }}
      />
    </div>
  );
};

export default AbsenceTypeDistribution; 