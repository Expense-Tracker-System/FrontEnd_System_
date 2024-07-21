import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography, Paper, AppBar, Box } from '@mui/material';
import axios from 'axios';
import { toast } from "react-hot-toast";

const GetEIDetails = () => {
    const [organizationIncome, setOrganizationIncome] = useState({ description: '', amount: '' });
    const [organizationExpense, setOrganizationExpense] = useState({ description: '', amount: '' });
    const [errors, setErrors] = useState({ income: {}, expense: {} });
    const [organizationId, setOrganizationId] = useState(null);

    useEffect(() => {
        const orgId = new URLSearchParams(window.location.search).get('id');
        setOrganizationId(orgId ? parseInt(orgId) : null);
    }, []);

    const handleChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'income') {
            setOrganizationIncome(prev => ({ ...prev, [name]: value }));
        } else {
            setOrganizationExpense(prev => ({ ...prev, [name]: value }));
        }
    };

    const validate = (type) => {
        let tempErrors = { income: {}, expense: {} };
        const data = type === 'income' ? organizationIncome : organizationExpense;
        
        if (!data.description) tempErrors[type].description = "Description is required.";
        if (!data.amount) tempErrors[type].amount = "Amount is required.";
        else if (isNaN(parseFloat(data.amount))) tempErrors[type].amount = "Amount must be a number.";
        else if (parseFloat(data.amount) <= 0) tempErrors[type].amount = "Amount must be greater than zero.";

        setErrors(prev => ({ ...prev, [type]: tempErrors[type] }));
        return Object.values(tempErrors[type]).every(x => x === "");
    };

    const handleSubmit = async (type) => {
        if (validate(type) && organizationId) {
            try {
                const data = type === 'income' ? organizationIncome : organizationExpense;
                const formattedData = {
                    amount: parseFloat(data.amount),
                    description: data.description,
                    organizationId: organizationId
                };

                const response = await axios.post(
                    `https://localhost:7026/api/Organization${type.charAt(0).toUpperCase() + type.slice(1)}`,
                    formattedData
                );

                if (response.status === 200) {
                    console.log(`Organization ${type}:`, response.data);
                    if (type === 'income') {
                        setOrganizationIncome({ description: '', amount: '' });
                        toast.success("Income added successfully");
                    } else {
                        setOrganizationExpense({ description: '', amount: '' });
                        toast.success("Expense added successfully");
                    }
                } else {
                    throw new Error('Unexpected response status');
                }
            } catch (error) {
                console.error('Error adding data:', error);
                toast.error("An Error occurred.");
                alert(`Failed to add ${type}. ${error.response?.data?.message || error.message}`);
            }
        } else if (!organizationId) {
            alert('Organization ID is missing. Please check the URL.');
        }
    };

    const renderIncomeExpensePage = () => (
        <Container maxWidth="xl" sx={{ mt: 5 }}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h6" gutterBottom align="center">Add Organization Income</Typography>
                        <TextField
                            name="description"
                            label="Description"
                            value={organizationIncome.description}
                            onChange={(e) => handleChange(e, 'income')}
                            error={!!errors.income.description}
                            helperText={errors.income.description}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="amount"
                            label="Amount"
                            type="number"
                            value={organizationIncome.amount}
                            onChange={(e) => handleChange(e, 'income')}
                            error={!!errors.income.amount}
                            helperText={errors.income.amount}
                            fullWidth
                            margin="normal"
                            inputProps={{ step: "0.01" }}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleSubmit('income')}
                            fullWidth
                            sx={{ mt: 2, backgroundColor: 'black', color: 'white' }}
                        >
                            Add Organization Income
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h6" gutterBottom align="center">Add Organization Expense</Typography>
                        <TextField
                            name="description"
                            label="Description"
                            value={organizationExpense.description}
                            onChange={(e) => handleChange(e, 'expense')}
                            error={!!errors.expense.description}
                            helperText={errors.expense.description}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="amount"
                            label="Amount"
                            type="number"
                            value={organizationExpense.amount}
                            onChange={(e) => handleChange(e, 'expense')}
                            error={!!errors.expense.amount}
                            helperText={errors.expense.amount}
                            fullWidth
                            margin="normal"
                            inputProps={{ step: "0.01" }}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleSubmit('expense')}
                            fullWidth
                            sx={{ mt: 2, backgroundColor: 'black', color: 'white' }}
                        >
                            Add Organization Expense
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );

    return (
        <Container>
            <AppBar position="static">
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', color: 'black', backgroundColor:'white', }}>
                    <Typography variant="h6">
                        Organization Income and Expense
                    </Typography>
                </Box>
            </AppBar>
            {renderIncomeExpensePage()}
        </Container>
    );
};

export default GetEIDetails;
