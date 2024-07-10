import React from 'react';
import { Container, Grid, Link, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#07271F',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ color: 'white' }}>
              Features
            </Typography>
            <ul>
              {['Expense Management', 'Spend Management', 'Expense Reports', 'Company Credit Card', 'Receipt Scanning App', 'Bill Pay', 'Invoicing', 'Payroll', 'Travel'].map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="text.secondary" sx={{ color: 'white' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ color: 'white' }}>
              Resources
            </Typography>
            <ul>
              {['ExpensifyApproved!', 'Press Kit', 'Support', 'ExpensifyHelp', 'Community', 'Privacy'].map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="text.secondary" sx={{ color: 'white' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ color: 'white' }}>
              Learn more
            </Typography>
            <ul>
              {['About Expensify', 'Blog', 'Jobs', 'Expensify.org', 'Investor Relations'].map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="text.secondary" sx={{ color: 'white' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ color: 'white' }}>
              Get Started
            </Typography>
            <ul>
              {['Create a new account', 'Log in'].map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="text.secondary" sx={{ color: 'white' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ color: 'white' }}>
              {'©2008-2024 Expensify, Inc.'}
              <br />
              {'Money transmission is provided by Expensify Payments LLC (NMLS ID:2017010) pursuant to its licenses.'}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;