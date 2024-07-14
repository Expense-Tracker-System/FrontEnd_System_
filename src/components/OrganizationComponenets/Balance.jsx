import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Container, Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Balance = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState({ startDate: '', endDate: '' });
  const location = useLocation();
  const orgid = new URLSearchParams(location.search).get('id');

  const validateInputs = () => {
    let valid = true;
    let errors = { startDate: '', endDate: '' };

    if (!startDate) {
      errors.startDate = 'Start date is required';
      valid = false;
    }

    if (!endDate) {
      errors.endDate = 'End date is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const fetchData = async () => {
    if (!validateInputs()) return;

    try {
      const formattedStartDate = new Date(startDate).toISOString();
      const formattedEndDate = new Date(endDate).toISOString();
      const response = await axios.get(`https://localhost:7026/api/OrganizationReports/monthly-report`, {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          organizationId: orgid
        }
      });

      console.log('API response:', response);

      if (response.data.length > 0) {
        const { month, totalIncome, totalExpense, totalBalance } = response.data[0];
        setData({ month, totalIncome, totalExpense, totalBalance });
        console.log('Data set:', { month, totalIncome, totalExpense, totalBalance });
      } else {
        console.log('No data available for the given dates.');
        setData(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(null);
    }
  };

  return (
    <Container>
      <Grid container spacing={2} alignItems="center" justify="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            error={!!errors.startDate}
            helperText={errors.startDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            error={!!errors.endDate}
            helperText={errors.endDate}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            style={{ backgroundColor: 'black', color: 'white' }} 
            onClick={fetchData}
          >
            Show Balance
          </Button>
        </Grid>
      </Grid>
      {data && (
        <Box 
          style={{ 
            marginTop: '20px', 
            padding: '20px', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px'
          }}
        >
          <Typography variant="h6" style={{ fontWeight: 'bold', textAlign: 'center' }}>Report for {data.month}</Typography>
          <Typography style={{ textAlign: 'center' }}>
            <strong>Total Income:</strong> {data.totalIncome}
          </Typography>
          <Typography style={{ textAlign: 'center' }}>
            <strong>Total Expense:</strong> {data.totalExpense}
          </Typography>
          <Typography style={{ textAlign: 'center' }}>
            <strong>Total Balance:</strong> {data.totalBalance}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Balance;
