import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const BudgetDetails = ({
  budget,
  onClose,
  onDeleteExpense,
  onUpdateBudget,
  getall,
}) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedBudget, setUpdatedBudget] = useState({
    id: budget.id,
    budgetName: budget.budgetName,
    budgetAmount: budget.budgetAmount,
    budgetDescription: budget.budgetDescription,
  });
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBudget((prevBudget) => ({
      ...prevBudget,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.budgetName = updatedBudget.budgetName ? "" : "This field is required.";
    tempErrors.budgetAmount = updatedBudget.budgetAmount > 0 ? "" : "This field is required.";
    tempErrors.budgetDescription = updatedBudget.budgetDescription ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleUpdateClick = () => {
    setIsUpdateDialogOpen(true);
  };

  const handleSaveClick = async () => {
    if (validate()) {
      try {
        console.log("Sending PUT request to update budget:", updatedBudget);
        const response = await axiosInstance.put(
          `/Budgets/${budget.id}`,
          updatedBudget
        );
        console.log("Response from PUT request:", response.data);
        onUpdateBudget(response.data);
        setIsUpdateDialogOpen(false);
        getbudget();
        getall();
        toast.success("Budget updated successfully");
      } catch (error) {
        console.error("Error updating budget:", error);
        toast.error("An error occurred while updating the budget");
      }
    } else {
      toast.error("Please fill out all required fields");
    }
  };

  const getbudget = async () => {
    try {
      const response = await axiosInstance.get(`/Budgets/getsinglebudget?id=${budget.id}`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  const deleteexpense = async (expenseid) => {
    try {
      console.log(expenseid);
      const response = await axiosInstance.delete(`/BExpenses/deleteexpense?id=${expenseid}`);
      console.log(response.data);
      getbudget();
      getall();
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  useEffect(() => {
    getbudget();
  }, []);

  const handleCloseUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  return (
    <>
      <DialogContent sx={{ width: "600px", height: "600px" }}>
        <Typography
          variant="h4"
          color="textSecondary"
          sx={{ fontWeight: "bold" }}
        >
          {data.budgetName} Details
          <Typography variant="body1">{data.budgetDescription}</Typography>
        </Typography>
        <Box mt={1}>
          <Typography variant="h6" sx={{ color: "black" }}>
            Total Budgeted: ${data.budgetAmount === undefined ? " " : data.budgetAmount.toFixed(2)}
          </Typography>
          <Typography variant="h6" sx={{ color: "red" }}>
            Total Spent: ${data.spent === undefined ? " " : data.spent.toFixed(2)}
          </Typography>
          <Typography variant="h6" sx={{ color: "green" }}>
            Remaining: ${data.remain === undefined ? " " : data.remain.toFixed(2)}
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography variant="h5">{data.budgetName} Expenses:</Typography>
          {data.expenses === undefined ? [] : data.expenses.map((expense, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1" sx={{ fontSize: "20px" }}>
                {expense.bExpenseName} $ {expense.bExpenseAmount.toFixed(2)}
              </Typography>
              <IconButton
                aria-label="delete"
                onClick={() => deleteexpense(expense.expenseId)}
                sx={{ color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#07271F",
            textTransform: "none",
            marginTop: "10px",
            fontSize: "16px",
          }}
          onClick={handleUpdateClick}
        >
          Update Budget
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#07271F",
            textTransform: "none",
            marginTop: "10px",
            fontSize: "16px",
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>

      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogContent>
          <TextField
            name="budgetName"
            label="Budget Name"
            value={updatedBudget.budgetName}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.budgetName}
            helperText={errors.budgetName}
          />
          <TextField
            name="budgetDescription"
            label="Description"
            value={updatedBudget.budgetDescription}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            error={!!errors.budgetDescription}
            helperText={errors.budgetDescription}
          />
          <TextField
            name="budgetAmount"
            label="Amount"
            value={updatedBudget.budgetAmount}
            onChange={handleInputChange}
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: { min: 0, step: "0.01" },
            }}
            fullWidth
            margin="normal"
            error={!!errors.budgetAmount}
            helperText={errors.budgetAmount}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#07271F",
              textTransform: "none",
              marginTop: "10px",
              fontSize: "16px",
            }}
            onClick={handleSaveClick}
          >
            Save
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#07271F",
              textTransform: "none",
              marginTop: "10px",
              fontSize: "16px",
            }}
            onClick={handleCloseUpdateDialog}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BudgetDetails;
