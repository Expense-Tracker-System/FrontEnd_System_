import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';

const ExpenseIncomeChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        label: 'Income',
        data: data.map(d => d.income),
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
      },
      {
        label: 'Expenses',
        data: data.map(d => d.expenses),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Expense vs Income
        </Typography>
        <Bar data={chartData} />
      </CardContent>
    </Card>
  );
};

export default ExpenseIncomeChart;
