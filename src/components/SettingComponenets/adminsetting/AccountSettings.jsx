import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog'; // Adjust the import path as needed
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-hot-toast';

const AccountSettings = () => {
  const [Fname, setFName] = useState('');
  const [Lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setusername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [updateType, setUpdateType] = useState(''); // 'account', 'username', or 'password'
  const [dataset, setdataset] = useState({});

  const handleSaveChanges = () => {
    const updatedData = {
      Fname,
      Lname,
      email, 
      username,
      currentPassword,
      newPassword,
      phone,
    };
  };
  const getall = async () => {
    try {
      const response = await axiosInstance.get("/Adminsetting");
      console.log(response.data);
      setFName(response.data[0].firstName);
      setLName(response.data[0].lastName);
      setEmail(response.data[0].email);
      setPhone(response.data[0].phoneNumber);
      setusername(response.data[0].username);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { getall() }, []);

  const editprofile = async () => {
    try {
      const response = await axiosInstance.put("/Adminsetting/update",{
        firstName: Fname,
        lastName: Lname,
        username: username,
        email: email,
        phoneNumber: phone,
        password: "pwd",
        confirmPassword: "pwd"
      });
      getall();
      console.log(response.data);
      toast.success('Profile updated successfully');
      handleDialogClose();

    } catch (error) {
      console.log(error);
      toast.error('Failed to update profile.');
    }
  };
  const handleOpenDialog = (type) => {
    setUpdateType(type);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = () => {
    handleSaveChanges();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: '500' }}>
        Account Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={10} sm={6}>
          <TextField
            label="First Name"
            variant="outlined"
            defaultValue={Fname}
            value={Fname}
            onChange={(e) => setFName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            variant="outlined"
            defaultValue={Lname}
            value={Lname}
            onChange={(e) => setLName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            variant="outlined"
            defaultValue={phone}
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
            defaultValue={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Username"
            variant="outlined"
            defaultValue={username}
            value={username}
            onChange={(e) => setusername(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog('username')}
        sx={{ backgroundColor: '#07271F', "&:hover": { backgroundColor: "#07271F" }, marginTop: '15px' }}
      >
        Save Changes
      </Button>

      <Grid container spacing={6} sx={{ paddingTop: '30px' }}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: '500' }}>
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
          <TextField
            label="Confirm New Password"
            variant="outlined"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog('password')}
          sx={{ backgroundColor: '#07271F', "&:hover": { backgroundColor: "#07271F" }, marginTop: '15px' }}
        >
          Save Changes
        </Button>

      <ConfirmationDialog
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
        editprofile={editprofile}
      />
    </Box>
  );
};

export default AccountSettings;
