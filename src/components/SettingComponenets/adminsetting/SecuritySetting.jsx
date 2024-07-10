import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import axios from "axios";

const SecuritySettings = () => {
  const [passwordPolicy, setPasswordPolicy] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [lockoutPolicy, setLockoutPolicy] = useState(false);
  const [lockoutThreshold, setLockoutThreshold] = useState("");
  const [lockoutDuration, setLockoutDuration] = useState("");
  const [passwordExpiration, setPasswordExpiration] = useState("");
  const [passwordHistory, setPasswordHistory] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleSaveChanges = () => {
    const updatedSettings = {
      passwordPolicy,
      twoFactorAuth,
      lockoutPolicy,
      lockoutThreshold: lockoutPolicy ? lockoutThreshold : null,
      lockoutDuration: lockoutPolicy ? lockoutDuration : null,
      passwordExpiration,
      passwordHistory,
      sessionTimeout,
    };

    axios
      .post("/api/security/update", updatedSettings)
      .then((response) => {
        console.log("Security settings saved successfully:", response.data);
        // Handle success (e.g., show a success message or update UI)
      })
      .catch((error) => {
        console.error("Error saving security settings:", error);
        // Handle error (e.g., show an error message)
      });
  };

  const handleDeactivateAccount = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Security Settings
      </Typography>
      <TextField
        label="Password Policy"
        variant="outlined"
        multiline
        rows={4}
        value={passwordPolicy}
        onChange={(e) => setPasswordPolicy(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={twoFactorAuth}
            onChange={(e) => setTwoFactorAuth(e.target.checked)}
          />
        }
        label="Enable Two-Factor Authentication"
        sx={{ mt: 2 }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={lockoutPolicy}
            onChange={(e) => setLockoutPolicy(e.target.checked)}
          />
        }
        label="Enable Account Lockout Policy"
        sx={{ mt: 2 }}
      />
      {lockoutPolicy && (
        <Box sx={{ ml: 3 }}>
          <TextField
            label="Lockout Threshold (attempts)"
            variant="outlined"
            type="number"
            value={lockoutThreshold}
            onChange={(e) => setLockoutThreshold(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Lockout Duration (minutes)"
            variant="outlined"
            type="number"
            value={lockoutDuration}
            onChange={(e) => setLockoutDuration(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
      )}
      <TextField
        label="Password Expiration (days)"
        variant="outlined"
        type="number"
        value={passwordExpiration}
        onChange={(e) => setPasswordExpiration(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password History"
        variant="outlined"
        type="number"
        value={passwordHistory}
        onChange={(e) => setPasswordHistory(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Session Timeout (minutes)"
        variant="outlined"
        type="number"
        value={sessionTimeout}
        onChange={(e) => setSessionTimeout(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveChanges}
        sx={{backgroundColor: '#07271F',"&:hover": { backgroundColor: "#07271F" },marginTop:"15px"}}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default SecuritySettings;
