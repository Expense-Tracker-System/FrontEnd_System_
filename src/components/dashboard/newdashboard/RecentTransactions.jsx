import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';

const RecentTransactions = ({ transactions }) => {
  const lineChartData = {
    labels: transactions.map(transaction => transaction.date),
    datasets: [
      {
        label: 'Transactions',
        data: transactions.map(transaction => transaction.amount),
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      },
    ],
  };

  return (
    <>
      
      <Card sx={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Recent Transactions
      </Typography>
        <Line data={lineChartData} />
      </Card>
      {transactions.map(transaction => (
        <Card key={transaction.id} sx={{ marginBottom: '10px', backgroundColor: '#e3f2fd' }}>
          <CardContent>
            <Typography variant="subtitle1">{transaction.name}</Typography>
            <Typography variant="body2">${transaction.amount}</Typography>
            <Typography variant="body2">{transaction.date}</Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default RecentTransactions;
