import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const AccountSettings = () => {
  const [Fname, setFName] = useState('');
  const [Lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSaveChanges = () => {
    const updatedData = {
      Fname,
      Lname,
      email,
      currentUsername,
      newUsername,
      currentPassword,
      newPassword,
      phone,
    };

    axios.post('/api/account/update', updatedData)
      .then(response => {
        console.log('Changes saved successfully:', response.data);
        // Handle success (e.g., show a success message or update UI)
      })
      .catch(error => {
        console.error('Error saving changes:', error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Account Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            variant="outlined"
            value={name}
            onChange={(e) => setFName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            variant="outlined"
            value={name}
            onChange={(e) => setLName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Change Username
          </Typography>
          <TextField
            label="Current Username"
            variant="outlined"
            value={currentUsername}
            onChange={(e) => setCurrentUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Username"
            variant="outlined"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Change Password
          </Typography>
          <TextField
            label="Current Password"
            variant="outlined"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{backgroundColor: '#07271F',"&:hover": { backgroundColor: "#07271F" }}}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default AccountSettings;
