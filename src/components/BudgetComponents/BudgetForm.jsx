import React, { useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const FormContainer = styled(Box)({
  border: "1px dashed #ccc",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
});

const BudgetForm = ({ onCreateBudget, getall }) => {
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    budgetName: false,
    amount: false,
    description: false,
  });

  const handleCreateBudget = async () => {
    if (budgetName === "" || amount <= 0 || description === "") {
      setErrors({
        budgetName: budgetName === "",
        amount: amount <= 0,
        description: description === "",
      });
    } else {
      try {
        // Fetch existing budgets to check for duplicates
        const response = await axiosInstance.get("/Budgets");
        const existingBudgets = response.data;

        // Check if the budget name already exists
        const budgetExists = existingBudgets.some(
          (budget) => budget.budgetName.toLowerCase() === budgetName.toLowerCase()
        );

        if (budgetExists) {
          toast.error("Budget with this name already exists.");
          return;
        }

        // Proceed to create the budget if it doesn't exist
        await axiosInstance.post("/Budgets", {
          budgetName: budgetName,
          budgetAmount: amount,
          budgetDescription: description,
        });

        setBudgetName("");
        setAmount(0);
        setDescription("");
        getall();
        toast.success("Budget set successfully");
      } catch (err) {
        console.log(err);
        toast.error("An error occurred.");
      }
    }
  };

  return (
    <FormContainer>
      <Typography variant="h5">Create budget</Typography>
      <TextField
        label="Budget Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={budgetName}
        onChange={(e) => setBudgetName(e.target.value)}
        placeholder="e.g., Groceries"
        error={errors.budgetName}
        helperText={errors.budgetName ? "Budget Name is required" : ""}
      />
      <TextField
        label="Amount"
        variant="outlined"
        fullWidth
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g., $350"
        error={errors.amount}
        helperText={errors.amount ? "Amount is required" : ""}
      />
      <TextField
        label="Budget Description"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="e.g., Monthly groceries and essentials"
        error={errors.description}
        helperText={errors.description ? "Description is required" : ""}
      />
      <Button
        style={{
          backgroundColor: "#07271F",
          textTransform: "none",
          marginTop: "10px",
          fontSize: "16px",
        }}
        variant="contained"
        color="primary"
        onClick={handleCreateBudget}
      >
        Create Budget
      </Button>
    </FormContainer>
  );
};

export default BudgetForm;
