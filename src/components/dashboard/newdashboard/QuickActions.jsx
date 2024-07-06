import React from 'react';
import { Button, Typography } from '@mui/material';

const QuickActions = () => (
  <>
    <Typography variant="h6" gutterBottom>
      Quick Actions
    </Typography>
    <Button variant="contained" color="primary" sx={{ marginRight: '10px', backgroundColor: '#4caf50' }}>
      Add Expense
    </Button>
    <Button variant="contained" color="primary" sx={{ marginRight: '10px', backgroundColor: '#2196f3' }}>
      Add Income
    </Button>
    <Button variant="contained" color="primary" sx={{ backgroundColor: '#ff9800' }}>
      View Budgets
    </Button>
  </>
);

export default QuickActions;
