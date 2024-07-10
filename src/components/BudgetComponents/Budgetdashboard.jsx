import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Dialog, DialogActions, Button, TextField } from '@mui/material';
import BudgetForm from './BudgetForm';
import ExpenseForm from './ExpenseForm';
import BudgetCard from './BudgetCard';
import BudgetDetails from './BudgetDetails';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';

const BudgetDashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [mybudget, setMybudget] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateBudget = (newBudget) => {
    setBudgets([...budgets, { ...newBudget, expenses: [] }]);
  };

  const handleAddExpense = (newExpense) => {
    setBudgets(budgets.map(budget => {
      if (budget.budgetName === newExpense.budgetCategory) {
        return {
          ...budget,
          expenses: [...budget.expenses, { expenseName: newExpense.expenseName, amount: newExpense.amount }]
        };
      }
      return budget;
    }));
  };

  const handleViewDetails = (budget) => {
    setSelectedBudget(budget);
  };

  const handleCloseDetails = () => {
    setSelectedBudget(null);
  };

  const handleDeleteBudget = async () => {
    try {
      await axiosInstance.delete(`/Budgets/${selectedBudget.id}`);
      setBudgets(budgets.filter(budget => budget.budgetName !== selectedBudget.budgetName));
      setIsDeleteDialogOpen(false);
      handleCloseDetails();
      // Fetch the updated list of budgets from the backend to refresh the view
      getall();
      toast.success('Budget deleted successfully');
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error('An error occurred while deleting the budget');
    }
  };
  const handleUpdateBudget = (updatedBudget) => {
    console.log("Updating budget in state:", updatedBudget);
    setBudgets(budgets.map(budget => 
      budget.id === updatedBudget.id ? updatedBudget : budget
    ));

  };

  const handleOpenDeleteDialog = (budget) => {
    setSelectedBudget(budget);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const getall = async () => {
    try {
      const response = await axiosInstance.get("/Budgets");
      console.log(response.data);
      setMybudget(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { getall() }, []);

  const filteredBudgets = mybudget.filter(budget => 
    budget.budgetName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BudgetForm getall={getall} onCreateBudget={handleCreateBudget} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ExpenseForm getall={getall} budget={mybudget} onAddExpense={handleAddExpense} budgetCategories={budgets.map(b => b.budgetName)} />
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom>
        Existing Budgets
      </Typography>

      <TextField
        label="Search Budgets"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{color: '#07271F'}}
      />

      <Grid container spacing={3}>
        {filteredBudgets.map((budget, index) => (
          <Grid item xs={12} md={6} key={index}>
            <BudgetCard 
              budget={budget} 
              onViewDetails={handleViewDetails} 
              onDelete={() => handleOpenDeleteDialog(budget)}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!selectedBudget} onClose={handleCloseDetails}>
        {selectedBudget && (
          <BudgetDetails 
            budget={selectedBudget} 
            onClose={handleCloseDetails} 
            onDelete={() => handleOpenDeleteDialog(selectedBudget)}
            onUpdateBudget={handleUpdateBudget}
            getall={getall}
          />
        )}
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <Typography variant="h6" style={{ padding: '20px' }}>
          Are you sure you want to delete this budget?
        </Typography>
        <DialogActions>
          <Button 
            style={{ backgroundColor: '#f7f0f0', textTransform: 'none', fontSize: '16px', color: 'red'}}
            variant="contained" 
            color="secondary" 
            onClick={handleDeleteBudget}
          >
            Yes
          </Button>
          <Button 
            style={{ backgroundColor: '#f7f0f0', textTransform: 'none', fontSize: '16px', color: '#07271F'}}
            variant="contained" 
            onClick={handleCloseDeleteDialog}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BudgetDashboard;
