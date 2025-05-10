import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';
import './AgeDistribution.css';

interface AgeData {
    ageGroup: string;
    homme: number;
    femme: number;
    [key: string]: string | number;
}

interface ApiResponse {
    ageDistribution: {
        [key: string]: {
            homme: number;
            femme: number;
        };
    };
}

interface AgeDistributionProps {
    timeFilter: string;
}

const AgeDistribution: React.FC<AgeDistributionProps> = ({ timeFilter }) => {
    const [data, setData] = useState<AgeData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAgeDistribution = async (filter: string) => {
        try {
            setLoading(true);
            const response = await axios.get<ApiResponse>(`http://localhost:5000/dashboard/ageDistribution?filter=${filter}`);
            const formattedData = Object.entries(response.data.ageDistribution).map(([ageGroup, counts]) => ({
                ageGroup,
                homme: counts.homme,
                femme: counts.femme
            }));
            setData(formattedData);
            setError(null);
        } catch (err) {
            setError('Failed to fetch age distribution data');
            console.error('Error fetching age distribution:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgeDistribution(timeFilter);
    }, [timeFilter]);

    if (loading) return <div className="age-distribution-chart">Loading...</div>;
    if (error) return <div className="age-distribution-chart">{error}</div>;

    return (
        <div className="age-distribution-chart">
            <ResponsiveBar
                data={data}
                keys={['homme', 'femme']}
                indexBy="ageGroup"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.2}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'category10' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#2ecc71',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#e74c3c',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'homme'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'femme'
                        },
                        id: 'lines'
                    }
                ]}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Age Groups',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Number of Employees',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
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
                role="application"
                ariaLabel="Age distribution by gender"
                barAriaLabel={e => `${e.id}: ${e.formattedValue} in age group: ${e.indexValue}`}
            />
        </div>
    );
};

export default AgeDistribution;
