import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import useAuth from '../../hooks/useAuth.hook';
import { useSearchParams } from 'react-router-dom';

import { toast } from "react-hot-toast";
import axios from 'axios';
import './TakeAmount.css';

const TakeAmount = () => {
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const { user } = useAuth();
  
  const [searchParams] = useSearchParams();
  const organizationId = parseInt(searchParams.get('id'), 10);
  const [userdata, setUserdata] = useState({ userId: user.id, organizationId, takeAmount: '' });

  useEffect(() => {
    console.log("organization", organizationId);
  }, [organizationId]);

  useEffect(() => {
    setUserdata((prevState) => ({
        ...prevState,
        userId: user.id,
        organizationId,
        takeAmount: Number(amount)
    }));
    console.log(userdata);
  }, [amount, user.id, organizationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
        setAlert({ show: true, message: 'Please enter a valid positive amount', type: 'error' });
        return;
    }
    console.log("Take amount =", Number(amount));

    try {
        const response = await axios.post('https://localhost:7026/api/UserOrganizations/add-take-amount', {
          userId: user.id,
          organizationId,
          takeAmount: Number(amount)
        });

        if (response.status === 200) {
           // setAlert({ show: true, message: 'Amount added successfully', type: 'success' });
            
            toast.success("Amount added successfully");
            setAmount('');
        } else {
           // setAlert({ show: true, message: 'Failed to add amount', type: 'error' });
           
           toast.success("Failed to add amount");

        }
    } catch (error) {
        console.error('Error adding amount:', error);
        setAlert({ show: true, message: 'An error occurred while adding the amount', type: 'error' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom align="center">Add Take Amount</Typography>
            {alert.show && (
              <Alert severity={alert.type} sx={{ mb: 2 }}>
                {alert.message}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="success"
                type="submit"
                fullWidth
                sx={{ mt: 2, backgroundColor: 'black', color: 'white' }}
              >
                Add Amount
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TakeAmount;
