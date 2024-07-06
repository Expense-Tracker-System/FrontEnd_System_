import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Typography, List, ListItem, ListItemText,
  ListItemSecondaryAction, IconButton, CircularProgress, useMediaQuery, useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import axiosInstance from '../../utils/axiosInstance';
import { USERS_LIST_URL, CREATE_ORGANIZATION } from '../../utils/globalConfig';
import { toast } from 'react-hot-toast'; // Assuming you use react-hot-toast for toasts

const CreateOrganizationPage = () => {
  const [title, setTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUserList, setShowUserList] = useState(true);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(USERS_LIST_URL);
        setUsers(response.data);
      } catch (error) {
        toast.error('An Error occurred. Please contact admin.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    if (!selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers((prevSelected) => [...prevSelected, user]);
    }
  };

  const handleCreateOrganization = async () => {
    setSubmitAttempted(true);
    if (!title.trim()) {
      return;
    }
    const organizationData = { title, users: selectedUsers };
    try {
      setLoading(true);
      const response = await axiosInstance.post(CREATE_ORGANIZATION, organizationData);
      setLoading(false);
      setSelectedUsers([]);
      setTitle('');
      setShowUserList(false);
      setSubmitAttempted(false);
      toast.success('Organization created successfully');
      navigate('/view-organization');
    } catch (error) {
      setLoading(false);
      toast.error('An Error occurred. Please contact admin.');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Create Organization</Typography>
      <TextField
        label="Organization Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: '20px' }}
        error={submitAttempted && !title.trim()}
        helperText={submitAttempted && !title.trim() ? "Organization title is required." : ''}
      />

      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: '20px' }}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          )
        }}
      />

      {showUserList && (
        <>
          {loading ? <CircularProgress /> : (
            <List>
              {users.map((user) => (
                <ListItem key={user.id}>
                  <ListItemText primary={user.userName} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleSelectUser(user)}>
                      <CheckIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}

          <Button variant="contained" color="success" onClick={handleCreateOrganization} sx={{ bgcolor: 'lightgreen', width: '100%', height: '40px', marginTop: '20px' }}>
            Create
          </Button>
        </>
      )}
    </Box>
  );
};

export default CreateOrganizationPage;
