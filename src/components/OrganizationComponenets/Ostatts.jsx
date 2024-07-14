import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useSearchParams } from 'react-router-dom';
import 'chart.js/auto'; // necessary for Chart.js

const Ostatts = () => {
  const [searchParams] = useSearchParams();
  const orgId = searchParams.get('id');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDate = new Date('2024-07-01T13:02:22.5600461').toISOString();
        const endDate = new Date('2024-07-31T13:02:22.5600461').toISOString();
        const url = `https://localhost:7026/api/OrganizationReports/monthly-report-with-user-shares?startDate=${startDate}&endDate=${endDate}&organizationId=${orgId}`;
        const response = await axios.get(url);
        const data = response.data;
        const userNames = [];
        const balances = [];
        data.forEach(report => {
          report.userBalances.forEach(userBalance => {
            userNames.push(userBalance.userName);
            balances.push(userBalance.balance);
          });
        });
        setChartData({
          labels: userNames,
          datasets: [
            {
              label: 'User Balance',
              data: balances,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [orgId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Monthly Report with User Shares</h2>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default Ostatts;
