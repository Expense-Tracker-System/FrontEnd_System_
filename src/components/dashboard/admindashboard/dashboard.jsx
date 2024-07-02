import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', logins: 10 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', logins: 15 },
  { id: 3, name: 'Sam Wilson', email: 'sam@example.com', role: 'User', logins: 8 },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEditUser = (userId) => {
    // Handle edit user logic
  };

  const handleAddUser = () => {
    // Handle add user logic
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Total Users Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{users.length}</Typography>
          </Paper>
        </Grid>

        {/* Add User Button */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Tooltip title="Add User">
              <IconButton color="primary" onClick={handleAddUser}>
                <PersonAddIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Paper>
        </Grid>

        {/* User Table */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User Management
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Logins</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.logins}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit User">
                          <IconButton color="primary" onClick={() => handleEditUser(user.id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete User">
                          <IconButton color="secondary" onClick={() => handleDeleteUser(user.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
