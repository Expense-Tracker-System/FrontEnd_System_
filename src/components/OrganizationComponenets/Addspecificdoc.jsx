// src/components/OrganizationComponents/Addspecificdoc.jsx

import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
  },
  box: {
    padding: theme.spacing(4),
    backgroundColor: '#fff',
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#a5d6a7',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#81c784',
    },
  },
}));

const AddSpecificDoc = () => {
  const classes = useStyles();

  const handleAddDocument = () => {
    // Add document logic here
    console.log('Add Document clicked');
  };

  const handleDownloadDocument = () => {
    // Download document logic here
    console.log('Download Document clicked');
  };

  return (
    <Container className={classes.root}>
      <Box className={classes.box}>
        <Typography variant="h6" gutterBottom>
          You can Upload and Download Specific Documents
        </Typography>
        <Box mt={2}>
          <Button
            className={classes.button}
            onClick={handleAddDocument}
            variant="contained"
          >
            Add Documents
          </Button>
          <Button
            className={classes.button}
            onClick={handleDownloadDocument}
            variant="contained"
          >
            Download Document
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddSpecificDoc;
