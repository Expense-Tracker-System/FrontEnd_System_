import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const TakeAmount = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    if (e.target.value === '') {
      setError('Amount is required');
    } else if (isNaN(e.target.value)) {
      setError('Amount must be a number');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount === '' || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7026/api/UserOrganizations/add-take-amount', {
        takeAmount: amount
      });
      if (response.status === 200) {
        setSuccessMessage('Amount added successfully!');
        window.alert('Amount added successfully.');
      }
    } catch (error) {
      setError('Failed to add amount');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          width: '300px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Add Your Take Amount
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            value={amount}
            onChange={handleAmountChange}
            error={!!error}
            helperText={error}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ marginTop: '16px', backgroundColor: 'black', color: 'white' }}
          >
            Add Amount
          </Button>
        </form>
        {successMessage && (
          <Typography variant="body1" color="success" sx={{ marginTop: '16px' }}>
            {successMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TakeAmount;
