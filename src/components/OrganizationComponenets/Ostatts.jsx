import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useSearchParams } from 'react-router-dom';
import 'chart.js/auto'; // necessary for Chart.js

const Ostatts = () => {
  const [searchParams] = useSearchParams();
  const organizationId = searchParams.get('id');

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://localhost:7026/api/OrganizationReports/monthly-report-with-user-shares?organizationId=${organizationId}`;

        const response = await axios.get(url);
        const data = response.data;

        // Process the data for the chart
        const userNames = data[0].userBalances.map(user => user.userName);
        const balances = data[0].userBalances.map(user => user.balance);

        setChartData({
          labels: userNames,
          datasets: [
            {
              label: 'User Balance',
              data: balances,
              backgroundColor: 'rgba(0, 0, 0, 1)',
              borderColor: 'rgba(0, 0, 0, 1)',
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    if (organizationId) {
      fetchData();
    }
  }, [organizationId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Monthly Report with User Shares</h2>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Balance',
                  font: {
                    weight: 'bold'
                  }
                },
                ticks: {
                  font: {
                    weight: 'bold'
                  }
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'User Names',
                  font: {
                    weight: 'bold'
                  }
                },
                ticks: {
                  font: {
                    weight: 'bold'
                  }
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: 'User Balances'
              }
            },
            barThickness: 'flex',
            maxBarThickness: 50
          }}
        />
      )}
    </div>
  );
};

export default Ostatts;
