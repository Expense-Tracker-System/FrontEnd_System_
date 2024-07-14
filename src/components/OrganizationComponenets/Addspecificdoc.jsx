// src/components/OrganizationComponents/AddSpecificDoc.jsx
import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/system';
import './AddSpecificDoc.css';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const CustomBox = styled(Box)({
  width: '300px',
  padding: '20px',
  border: '1px solid black',
  borderRadius: '8px',
  textAlign: 'center',
});

const CustomButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  marginBottom: '10px',
  '&:last-child': {
    marginBottom: '0',
  },
});

const AddSpecificDoc = () => {
  const [docName, setDocName] = useState('');
  const [error, setError] = useState(false);

  const handleAdd = () => {
    if (!docName) {
      setError(true);
    } else {
      setError(false);
      // Handle Add Document logic
      console.log('Document Added:', docName);
    }
  };

  const handleView = () => {
    // Handle View Document logic
    console.log('Viewing Documents');
  };

  return (
    <Container>
      <CustomBox>
        <Typography variant="h5" gutterBottom>
          Specific Documents
        </Typography>
        <TextField
          label="Document Name"
          variant="outlined"
          fullWidth
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
          error={error}
          helperText={error ? 'Document name is required' : ''}
          sx={{ marginBottom: '20px' }}
        />
        <CustomButton variant="contained" onClick={handleAdd}>
          Add Documents
        </CustomButton>
        <CustomButton variant="contained" onClick={handleView}>
          View Documents
        </CustomButton>
      </CustomBox>
    </Container>
  );
};

export default AddSpecificDoc;
