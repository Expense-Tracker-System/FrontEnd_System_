import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import axios from 'axios';
import OverviewCards from './OverviewCards';
import RecentTransactions from './RecentTransactions';
import QuickActions from './QuickActions';
import ExpenseIncomeChart from './ExpenseIncomeChart';
import MyLogsPage from './MyLogsPage';

const UserDashboard = () => {
  const [overview, setOverview] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [budgetSummary, setBudgetSummary] = useState([]);
  const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     // Fetch overview data
//     axios.get('/api/overview')
//       .then(response => setOverview(response.data))
//       .catch(error => console.error('Error fetching overview data:', error));

//     // Fetch recent transactions
//     axios.get('/api/transactions/recent')
//       .then(response => setTransactions(response.data))
//       .catch(error => console.error('Error fetching recent transactions:', error));

//     // Fetch budget summary
//     axios.get('/api/budget/summary')
//       .then(response => setBudgetSummary(response.data))
//       .catch(error => console.error('Error fetching budget summary:', error));

//     // Fetch chart data
//     axios.get('/api/chart/data')
//       .then(response => setChartData(response.data))
//       .catch(error => console.error('Error fetching chart data:', error));
//   }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <OverviewCards overview={overview} />
        </Grid>

        <Grid item xs={12} lg={6}>
        <ExpenseIncomeChart data={chartData} />
        </Grid>

        <Grid item xs={12} lg={6}>
        <RecentTransactions transactions={transactions} />
        </Grid>

        <Grid item xs={12}>
          <QuickActions />
        </Grid>

        <Grid item xs={12}>
            <MyLogsPage />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
