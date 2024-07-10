import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, FormControlLabel, Radio, RadioGroup, FormLabel, Switch, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Settings = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted');
  };

  const handleDeactivate = () => {
    // Handle account deactivation logic
    console.log('Account deactivated');
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      {/* Personal Information Settings */}
      <Box mb={3}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Personal Information Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                // Add value and onChange handlers
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                // Add value and onChange handlers
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                type="email"
                // Add value and onChange handlers
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                // Add value and onChange handlers
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', backgroundColor: "#07271F" }}>
            Save
          </Button>
        </form>
      </Box>

      {/* Account Settings */}
      <Box mb={3}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Account Settings
        </Typography>

        {/* Change Username */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Change Username
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Current Username"
                  variant="outlined"
                  fullWidth
                  required
                  // Add value and onChange handlers
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Username"
                  variant="outlined"
                  fullWidth
                  required
                  // Add value and onChange handlers
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', backgroundColor: "#07271F" }}>
              Change Username
            </Button>
          </form>
        </Box>

        {/* Change Password */}
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Current Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  // Add value and onChange handlers
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  // Add value and onChange handlers
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm New Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  // Add value and onChange handlers
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', backgroundColor: "#07271F" }}>
              Change Password
            </Button>
          </form>
        </Box>
      </Box>

      {/* General Settings */}
      <Box mb={3}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          General Settings
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  // Add value and onChange handlers
                  label="Language"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="si">සිංහල</MenuItem>
                  {/* Add more languages */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  // Add value and onChange handlers
                  label="Currency"
                >
                  <MenuItem value="usd">USD - United States Dollar</MenuItem>
                  <MenuItem value="eur">EUR - Euro</MenuItem>
                  <MenuItem value="lkr">LKR - Lankan Rupees</MenuItem>
                  <MenuItem value="inr">INR - Indian Rupees</MenuItem>
                  {/* Add more currencies */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', backgroundColor: "#07271F" }}>
            Save
          </Button>
        </form>
      </Box>

      {/* Notification Settings */}
      <Box mb={3}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Notification Settings
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch name="emailNotifications" />}
                label="Email Notifications"
                // Add value and onChange handlers
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch name="smsNotifications" />}
                label="SMS Notifications"
                // Add value and onChange handlers
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch name="pushNotifications" />}
                label="Push Notifications"
                // Add value and onChange handlers
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', backgroundColor: "#07271F" }}>
            Save
          </Button>
        </form>
      </Box>

      {/* Deactivate Account */}
      <Box mb={3} mt={5}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Deactivate Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Why are you deactivating?</FormLabel>
            <RadioGroup
              aria-label="deactivationReason"
              name="deactivationReason"
              // Add value and onChange handlers
            >
              <FormControlLabel value="privacyConcerns" control={<Radio />} label="Privacy Concerns" />
              <FormControlLabel value="notUseful" control={<Radio />} label="Not Useful" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
            <TextField
              label="Please specify (if 'Other')"
              variant="outlined"
              fullWidth
              // Add value and onChange handlers
              style={{ marginTop: '10px' }}
            />
          </FormControl>
        </form>
      </Box>
      <Box mb={3}>
        <Button variant="contained" color="secondary" style={{ backgroundColor: '#faeae8', color: 'red' }} onClick={handleClickOpen}>
          Deactivate Account
        </Button>
      </Box>

      {/* Deactivation Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>{"Deactivate Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to deactivate your account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" style={{ backgroundColor: '#f7f0f0', textTransform: 'none', fontSize: '16px', color: '#07271F'}}>
            No
          </Button>
          <Button onClick={handleDeactivate} color="secondary" style={{ backgroundColor: '#f7f0f0', textTransform: 'none', fontSize: '16px', color: 'red'}}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;
