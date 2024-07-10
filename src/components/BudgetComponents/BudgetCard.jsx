import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Button } from '@mui/material';
import { styled } from '@mui/system';

const BudgetCardContainer = styled(Card)(({ theme }) => ({
  margin: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  border: `1px solid ${theme.palette.divider}`,
}));

const BudgetCard = ({ budget, onViewDetails, onDelete }) => {
  return (
    <BudgetCardContainer sx={budget.remain < 0 && {border: '4px solid red'}} 
     >
      <CardContent>
        <Typography variant="h5" color="textSecondary" sx={{fontWeight: 'bold'}}>
          {budget.budgetName}
        </Typography>
        <Typography variant="h5" component="div">
          ${budget.budgetAmount.toFixed(2)} Budgeted
        </Typography>
        <LinearProgress variant="determinate" value={(budget.spent / budget.budgetAmount) * 100} />
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography color="textSecondary" sx={{fontWeight: 'bold'}}>${budget.spent} spent</Typography>
          <Typography color="textSecondary" sx={{fontWeight: 'bold'}}>${budget.remain} remaining</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button 
            variant="contained" 
            color="primary"   
            style={{ backgroundColor: '#07271F', textTransform: 'none', fontSize: '16px'}}
            onClick={() => onViewDetails(budget)}
          >
            View Details
          </Button>
          <Button 
            variant="contained" 
            color="secondary"   
            style={{ backgroundColor: '#faeae8', textTransform: 'none', fontSize: '16px', color: 'red', fontWeight: 'bold'}}
            onClick={onDelete}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </BudgetCardContainer>
  );
};

export default BudgetCard;
