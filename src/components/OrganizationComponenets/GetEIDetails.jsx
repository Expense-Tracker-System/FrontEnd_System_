import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, Paper, AppBar, Toolbar, Box } from '@mui/material';
import axios from 'axios';

const GetEIDetails = () => {
    const [organizationIncome, setOrganizationIncome] = useState({ description: '', amount: '' });
    const [organizationExpense, setOrganizationExpense] = useState({ description: '', amount: '' });
    const [errors, setErrors] = useState({ income: {}, expense: {} });

    const handleChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'income') {
            setOrganizationIncome({ ...organizationIncome, [name]: value });
        } else {
            setOrganizationExpense({ ...organizationExpense, [name]: value });
        }
    };

    const validate = () => {
        let tempErrors = { income: {}, expense: {} };
        if (!organizationIncome.description) tempErrors.income.description = "Description is required.";
        if (!organizationIncome.amount) tempErrors.income.amount = "Amount is required.";
        if (!organizationExpense.description) tempErrors.expense.description = "Description is required.";
        if (!organizationExpense.amount) tempErrors.expense.amount = "Amount is required.";

        setErrors(tempErrors);
        return Object.values(tempErrors.income).every(x => x === "") && Object.values(tempErrors.expense).every(x => x === "");
    };

    const handleSubmit = async (type) => {
        if (validate()) {
            try {
                if (type === 'income') {
                    await axios.post('https://localhost:7026/api/OrganizationIncome', organizationIncome);
                    console.log('Organization Income:', organizationIncome);
                } else {
                    await axios.post('https://localhost:7026/api/OrganizationExpense', organizationExpense);
                    console.log('Organization Expense:', organizationExpense);
                }
                alert(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully.`);
            } catch (error) {
                console.error('Error adding data:', error);
                alert(`Failed to add ${type}.`);
            }
        }
    };

    const renderIncomeExpensePage = () => (
        <Container maxWidth="md" sx={{ mt: 5 }}>
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
                            value={organizationIncome.amount}
                            onChange={(e) => handleChange(e, 'income')}
                            error={!!errors.income.amount}
                            helperText={errors.income.amount}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleSubmit('income')}
                            fullWidth
                            sx={{ mt: 2 ,backgroundColor: 'lightgreen' }}
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
                            value={organizationExpense.amount}
                            onChange={(e) => handleChange(e, 'expense')}
                            error={!!errors.expense.amount}
                            helperText={errors.expense.amount}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleSubmit('expense')}
                            fullWidth
                            sx={{ mt: 2 ,backgroundColor: 'lightgreen'}}
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
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6">
                            Add Incomes and Expenses Here(Only Organization Leader Can Apply This Form.)
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderIncomeExpensePage()}
        </Container>
    );
};

export default GetEIDetails;
