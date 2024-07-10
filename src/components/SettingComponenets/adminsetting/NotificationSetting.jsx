import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControlLabel, Switch } from '@mui/material';

const NotificationSettings = () => {
  const [emailTemplate, setEmailTemplate] = useState('');
  const [smsTemplate, setSmsTemplate] = useState('');
  const [pushNotifications, setPushNotifications] = useState(false);
  const [notificationSound, setNotificationSound] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState('');

  const handleSaveChanges = () => {
    // Implement save functionality here
    console.log('Email Template:', emailTemplate);
    console.log('SMS Template:', smsTemplate);
    console.log('Push Notifications Enabled:', pushNotifications);
    console.log('Notification Sound Enabled:', notificationSound);
    console.log('Notification Frequency:', notificationFrequency);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Notification Settings
      </Typography>
      <TextField
        label="Email Template"
        variant="outlined"
        value={emailTemplate}
        onChange={(e) => setEmailTemplate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="SMS Template"
        variant="outlined"
        value={smsTemplate}
        onChange={(e) => setSmsTemplate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={<Switch checked={pushNotifications} onChange={(e) => setPushNotifications(e.target.checked)} />}
        label="Enable Push Notifications"
        sx={{ mt: 2 }}
      />
      <FormControlLabel
        control={<Switch checked={notificationSound} onChange={(e) => setNotificationSound(e.target.checked)} />}
        label="Notification Sound"
        sx={{ mt: 2 }}
      />
      <TextField
        label="Notification Frequency"
        variant="outlined"
        value={notificationFrequency}
        onChange={(e) => setNotificationFrequency(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ backgroundColor: '#07271F', marginTop: '15px' }}>
        Save Changes
      </Button>
    </Box>
  );
};

export default NotificationSettings;
