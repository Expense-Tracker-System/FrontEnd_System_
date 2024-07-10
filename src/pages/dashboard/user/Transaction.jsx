import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

const Transaction = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [Idescription, setIDescription] = useState('');
    const [Iamount, setIAmount] = useState('');

    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [transactions, setTransactions] = useState([]);

    const validateIncomeForm = () => {
        const validationErrors = {};
        if (!Idescription.trim()) {
            validationErrors.Idescription = 'Description is required';
        }
        if (!Iamount || isNaN(Iamount) || parseFloat(Iamount) === 0) {
            validationErrors.Iamount = 'Amount must be a number and not zero';
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const validateExpenseForm = () => {
        const validationErrors = {};
        if (!description.trim()) {
            validationErrors.description = 'Description is required';
        }
        if (!amount || isNaN(amount) || parseFloat(amount) === 0) {
            validationErrors.amount = 'Amount must be a number and not zero';
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const addIncomeToAPI = async () => {
        if (!validateIncomeForm()) return;
        try {
            const model = {
                amount: parseFloat(Iamount),
                description: Idescription
            };
            const result = await axiosInstance.post("/Transaction/AddTransaction", model);
            setTransactions([...transactions, result.data]);
            setIDescription('');
            setIAmount('');
        } catch (error) {
            console.error("There was an error adding the transaction!", error);
            setApiError('There was an error adding the transaction. Please try again.');
        }
    };

    const addExpenseToAPI = async () => {
        if (!validateExpenseForm()) return;
        try {
            const model = {
                amount: -parseFloat(amount),
                description: description
            };
            const result = await axiosInstance.post("/Transaction/AddTransaction", model);
            setTransactions([...transactions, result.data]);
            setDescription('');
            setAmount('');
        } catch (error) {
            console.error("There was an error adding the transaction!", error);
            setApiError('There was an error adding the transaction. Please try again.');
        }
    };

    const updateTransactionInAPI = async (id, transaction) => {
        try {
            await axiosInstance.put(`/Transaction/UpdateTransaction`, transaction);
            getList(); // Refresh the list after update
        } catch (error) {
            console.error("There was an error updating the transaction!", error);
            throw error;
        }
    };

    const getList = async () => {
        try {
            const response = await axiosInstance.get("/Transaction/GetTransactions");
            setTransactions(response.data);
        } catch (error) {
            console.error("There was an error fetching the transactions!", error);
            setApiError('There was an error fetching transactions. Please try again later.');
        }
    };

    const handleEdit = (transaction) => {
        if (transaction.amount < 0) {
            setDescription(transaction.description);
            setAmount(-transaction.amount); // negate to get positive value
            setIDescription("");
            setIAmount("");
        } else {
            setIDescription(transaction.description);
            setIAmount(transaction.amount);
            setDescription("");
            setAmount("");
        }
        setEditId(transaction.id);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/Transaction/DeleteTransaction/${id}`);
            setTransactions(transactions.filter((t) => t.id !== id));
        } catch (error) {
console.log(error)         
   setApiError('There was an error deleting the transaction. Please try again.');
        }
    };

    const getIncome = () => {
        return transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    };

    const getExpenses = () => {
        return transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + (-t.amount), 0);
    };

    const getTotalAmount = () => {
        return transactions.reduce((acc, t) => acc + t.amount, 0);
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className='pageTemplate2'>
            <div className='bg-white-200'>
                <h1 className='text-4xl md:text-6xl font-bold text-center pt-6 text-black'>Transaction</h1>
                <div className='container mt-10 mx-auto px-5'>
                    <div className='p-2 bg-white rounded-lg shadow-lg'>
                        <div className='flex flex-col md:flex-row'>
                            <div className='flex flex-row w-full p-5 justify-between'>
                                <div className='rounded shadow-lg border p-5'>
                                    <h1 className='text-xl font-sans text-center mb-5'>Add Your Income</h1>
                                    <form onSubmit={(e) => { e.preventDefault(); addIncomeToAPI(); }} className='flex text-center flex-col mx-auto border-double border-indigo-50'>
                                        <input
                                            type='text'
                                            className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'
                                            placeholder='Description'
                                            value={Idescription}
                                            onChange={(e) => setIDescription(e.target.value)}
                                        />
                                        {errors.Idescription && <span className='text-red-500'>{errors.Idescription}</span>}
                                        <input
                                            type='number'
                                            className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'
                                            placeholder='Amount'
                                            value={Iamount}
                                            onChange={(e) => setIAmount(e.target.value)}
                                        />
                                        {errors.Iamount && <span className='text-red-500'>{errors.Iamount}</span>}
                                        <button className='bg-black hover:bg-violet-600 active:bg-violet-700 focus:outline-none text-white px-4 py-2 rounded-md'>{editId ? 'Update Income' : 'Add Income'}</button>
                                    </form>
                                </div>
                                <div className='rounded shadow-lg border p-5'>
                                    <h1 className='text-xl font-sans text-center mb-5'>Add Your Expense</h1>
                                    <form onSubmit={(e) => { e.preventDefault(); addExpenseToAPI(); }} className='flex text-center flex-col mx-auto border-double border-indigo-50'>
                                        <input
                                            type='text'
                                            className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'
                                            placeholder='Description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        {errors.description && <span className='text-red-500'>{errors.description}</span>}
                                        <input
                                            type='number'
                                            className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'
                                            placeholder='Amount'
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                        {errors.amount && <span className='text-red-500'>{errors.amount}</span>}
                                        <button className='bg-black hover:bg-violet-600 active:bg-violet-700 focus:outline-none text-white px-4 py-2 rounded-md'>{editId ? 'Update Expense' : 'Add Expense'}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {apiError && <div className='text-red-500 text-center'>{apiError}</div>}
                        <div className='mt-5'>
                            <div className='flex justify-between'>
                                <div className='p-4 bg-green-200 rounded-lg'>
                                    <h3 className='text-xl font-semibold'>Total Income</h3>
                                    <p className='text-2xl'>RS:{getIncome().toFixed(2)}</p>
                                </div>
                                <div className='p-4 bg-red-200 rounded-lg'>
                                    <h3 className='text-xl font-semibold'>Total Expenses</h3>
                                    <p className='text-2xl'>RS:{getExpenses().toFixed(2)}</p>
                                </div>
                                <div className='p-4 bg-blue-200 rounded-lg'>
                                    <h3 className='text-xl font-semibold'>Net Total</h3>
                                    <p className='text-2xl'>RS:{getTotalAmount().toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-10 ml-4'>
                            <table className='min-w-full bg-white'>
                                <thead>
                                    <tr>
                                        <th className='py-2 px-4'>Description</th>
                                        <th className='py-2 px-4'>Amount</th>
                                        <th className='py-2 px-4'>Type</th>
                                        <th className='py- px-4'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map(transaction => (
                                        <tr key={transaction.id}>
                                            <td className='border px-4 py-2'>{transaction.description}</td>
                                            <td className={`border px-4 py-2 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                {transaction.amount < 0 }{Math.abs(transaction.amount).toFixed(2)}
                                            </td>
                                            <td className='border px-4 py-2'>{transaction.amount < 0 ? 'Expense' : 'Income'}</td>
                                            <td className='border px-4 py-2'>
                                                <button
                                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2'
                                                    onClick={() => handleEdit(transaction)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded'
                                                    onClick={() => handleDelete(transaction.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transaction;
