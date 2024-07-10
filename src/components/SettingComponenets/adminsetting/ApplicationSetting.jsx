import React, { useState } from 'react';
import { Box, Typography, TextField, FormControlLabel, Switch, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const ApplicationSettings = () => {
  const [siteName, setSiteName] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [defaultLanguage, setDefaultLanguage] = useState('');
  const [currency, setCurrency] = useState('');
  const [enableUserRegistration, setEnableUserRegistration] = useState(false);
  const [siteLogoUrl, setSiteLogoUrl] = useState('');

  const handleSaveChanges = () => {
    const updatedSettings = {
      siteName,
      siteDescription,
      maintenanceMode,
      defaultLanguage,
      currency,
      enableUserRegistration,
      siteLogoUrl,
    };

    axios.post('/api/application/update', updatedSettings)
      .then(response => {
        console.log('Settings saved successfully:', response.data);
        // Handle success (e.g., show a success message or update UI)
      })
      .catch(error => {
        console.error('Error saving settings:', error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Application Settings
      </Typography>
      <TextField
        label="Site Name"
        variant="outlined"
        value={siteName}
        onChange={(e) => setSiteName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Site Description"
        variant="outlined"
        value={siteDescription}
        onChange={(e) => setSiteDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Site Logo URL"
        variant="outlined"
        value={siteLogoUrl}
        onChange={(e) => setSiteLogoUrl(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Default Language</InputLabel>
        <Select
          value={defaultLanguage}
          onChange={(e) => setDefaultLanguage(e.target.value)}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="fr">French</MenuItem>
          <MenuItem value="de">German</MenuItem>
          {/* Add more languages as needed */}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Currency</InputLabel>
        <Select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="JPY">JPY</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
          {/* Add more currencies as needed */}
        </Select>
      </FormControl>
      <FormControlLabel
        control={<Switch checked={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.checked)} />}
        label="Enable Maintenance Mode"
      />
      <FormControlLabel
        control={<Switch checked={enableUserRegistration} onChange={(e) => setEnableUserRegistration(e.target.checked)} />}
        label="Enable User Registration"
      />
      <Box mt={2} sx={{ display: 'flex'}}>
        <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{backgroundColor: '#07271F',"&:hover": { backgroundColor: "#07271F" }}}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ApplicationSettings;
