import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const OverviewCards = ({ overview }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <Card sx={{ backgroundColor: '#e0f7fa', color: '#00796b' }}>
        <CardContent>
          <Typography variant="h6">Total Income</Typography>
          <Typography variant="h4">${overview.totalIncome}</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card sx={{ backgroundColor: '#ffebee', color: '#d32f2f' }}>
        <CardContent>
          <Typography variant="h6">Total Expenses</Typography>
          <Typography variant="h4">${overview.totalExpenses}</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4}>
      <Card sx={{ backgroundColor: '#f3e5f5', color: '#7b1fa2' }}>
        <CardContent>
          <Typography variant="h6">Remaining Budget</Typography>
          <Typography variant="h4">${overview.remainingBudget}</Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default OverviewCards;
