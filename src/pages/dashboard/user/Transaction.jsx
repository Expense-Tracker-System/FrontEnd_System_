import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

const Transaction = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [Idescription, setIDescription] = useState('');
    const [Iamount, setIAmount] = useState('');
    
    const [transactions, setTransactions] = useState([]);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');

    // const addTransaction = async (e) => {
    //     e.preventDefault();

    //     const validationErrors = {};
    //     if (!description.trim()) {
    //         validationErrors.description = 'Description is required';
    //     }
    //     if (!amount || isNaN(amount) || parseFloat(amount) === 0) {
    //         validationErrors.amount = 'Amount must be a number and not zero';
    //     }
    //     if (!date) {
    //         validationErrors.date = 'Date is required';
    //     } else if (new Date(date) > new Date()) {
    //         validationErrors.date = 'Date cannot be in the future';
    //     }

    //     if (Object.keys(validationErrors).length > 0) {
    //         setErrors(validationErrors);
    //         return;
    //     }

    //     const transaction = { description, amount: parseFloat(amount) };

    //     try {
    //         if (editId) {
    //             await updateTransactionInAPI(editId, transaction);
    //             setTransactions(transactions.map((t) =>
    //                 t.id === editId ? { ...transaction, id: editId } : t
    //             ));
    //             setEditId(null);
    //         } else {
    //             const result = await addTransactionToAPI(transaction);
    //             setTransactions([...transactions, result.data]);
    //         }

    //         setDescription('');
    //         setAmount('');
    //         setDate('');
    //         setErrors({});
    //     } catch (error) {
    //         setApiError('There was an error processing your request. Please try again.');
    //     }
    // };

    const addIncomeToAPI = async (transaction) => {
        const validationErrors = {};
        if (!description.trim()) {
            validationErrors.Idescription = 'Description is required';
        }
        if (!Iamount || isNaN(Iamount) || parseFloat(Iamount) === 0) {
            validationErrors.Iamount = 'Amount must be a number and not zero';
        }
       
        try {
            const result = await axiosInstance.post("/Transaction/AddTransaction", {
                id: 0,
                amount: Iamount,
                description: Idescription
            });
            console.log(result.data)
            return result;

        } catch (error) {
            console.error("There was an error adding the transaction!", error);
            throw error;
        }
    };

    const addExpenseToAPI = async (transaction) => {
        const validationErrors = {};
        if (!description.trim()) {
            validationErrors.description = 'Description is required';
        }
        if (!amount || isNaN(amount) || parseFloat(amount) === 0) {
            validationErrors.amount = 'Amount must be a number and not zero';
        }
       
        try {
            const result = await axiosInstance.post("/Transaction/AddTransaction", {
                id: 0,
                amount: -amount,
                description: description
            });
            console.log(result.data)
            return result;

        } catch (error) {
            console.error("There was an error adding the transaction!", error);
            throw error;
        }
    };

    const updateTransactionInAPI = async (id, transaction) => {
        try {
            await axios.put(`/Transaction/${id}`, transaction);
        } catch (error) {
            console.error("There was an error updating the transaction!", error);
            throw error;
        }
    };

    const getList = async () => {
        try {
            const response = await axiosInstance("Transaction/GetTransactions");
            setTransactions(response.data);
        } catch (error) {
            console.error("There was an error fetching the transactions!", error);
            setApiError('There was an error fetching transactions. Please try again later.');
        }
    };

    const handleEdit = (transaction) => {
        if (transaction.amount < 0) {
            setDescription(transaction.description);
            setAmount(transaction.amount);
            setIAmount("")
            setIDescription("")
        }
        else{
            setIDescription(transaction.description)
            setIAmount(transaction.amount)
            setDescription("")
            setAmount("")
        }
        setEditId(transaction.id);
        
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7026/api/Transaction/${id}`);
            setTransactions(transactions.filter((t) => t.id !== id));
        } catch (error) {
            console.error("There was an error deleting the transaction!", error);
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
                            <div className='flex flex-row w-full  p-5 justify-between'>
                              
                                 <div className='rounded shadow-lg border p-5  '>
                                    <h1 className='text-xl font-sans text-center mb-5'>Add Your Income</h1>
                                    <form onSubmit={()=>addIncomeToAPI()} className='flex text-center flex-col mx-auto border-double border-indigo-50'>
                                        
                                        {errors.date && <span className='text-red-500'>{errors.date}</span>}
                                        <input
                                            type='text'
                                            className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'
                                            placeholder='Description'
                                            value={Idescription}
                                            onChange={(e) => setIDescription(e.target.value)}
                                        />
                                        {errors.description && <span className='text-red-500'>{errors.description}</span>}
                                        <input
                                            type='number'
                                            className='border border-slate-300 rounded-md w-full px-2 py-2 mb-2'
                                            placeholder='Amount'
                                            value={Iamount}
                                            onChange={(e) => setIAmount(e.target.value)}
                                        />
                                        {errors.amount && <span className='text-red-500'>{errors.amount}</span>}
                                        <button className='bg-black hover:bg-violet-600 active:bg-violet-700 focus:outline-none text-white px-4 py-2 rounded-md'>{editId ? 'Update Income' : 'Add Income'}</button>
                                    </form>
                                 </div>
                                <div className='justify-start flex flex-col bg-white p-4 rounded shadow-lg mb-5 mr-6'>
                                    <div className='mt-4 text-xl font-sans flex justify-between'>
                                        <span>Income:</span> <span className='text-green-500'>{getIncome()}</span>
                                    </div>
                                    <div className='mt-4 text-xl font-sans flex justify-between'>
                                        <span>Expense:</span> <span className='text-red-500'>{getExpenses()}</span>
                                    </div>
                                    <div className='mt-4 text-xl font-sans flex justify-between'>
                                        <span>Total:</span> <span className={getTotalAmount() < 0 ? 'text-red-300' : 'text-black-500'}>{getTotalAmount()}</span>
                                    </div>
                                    
                                </div>
                                <div className='rounded shadow-lg border p-5 justify-items-end '>
                                    <h1 className='text-xl font-sans text-center mb-5'>Add Your Expense</h1>
                                    <form onSubmit={()=>addExpenseToAPI()} className='flex text-center flex-col mx-auto border-double border-indigo-50'>
                                        
                                        {errors.date && <span className='text-red-500'>{errors.date}</span>}
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
                          <div className=' w-full  mt-10 md:mt-0 ml-2'>
                                <table className='w-full table-fixed text-left mt-4 ml-3'>
                                    <thead>
                                        <tr>
                                            <th className='text-xl font-thin  w-1/3 px-3 py-2'>Description</th>
                                            <th className='text-xl font-thin w-1/3 px-3 py-2'>Amount</th>
                                            <th className='text-xl font-thin w-1/3 px-3 py-2'>Transaction</th>

                                            <th className='text-xl font-thin w-1/3 px-3 py-2'>Action</th>
                                       

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((t) => (
                                            <tr key={t.id}>
                                                <td className='px-2 py-2'>{t.description}</td>
                                                <td className='px-2 py-2'>{t.amount}</td>
                                                <td className='px-2 py-2'>{t.amount < 0? "Expense": "Income"}</td>

                                                <td className='px-2 py-2'>
                                                    <div>
                                                        <button className='bg-green-500 px-1 rounded-lg py-1 text-white mr-1' onClick={() => handleEdit(t)}>Edit</button>
                                                        <button className='bg-red-500 px-1 rounded-lg py-1 text-white' onClick={() => handleDelete(t.id)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        {apiError && <div className='mt-4 text-red-500 text-center'>{apiError}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transaction;
