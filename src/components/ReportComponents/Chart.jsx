import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './chart.css';  

const Chart = () => {
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30))); 
    const [endDate, setEndDate] = useState(new Date()); // Today's date
    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('bar'); // Default to 'bar' chart

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7026/api/FinancialReport/GetFinancialData', {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                }
            });

            const { monthlyIncomes, monthlyExpenses } = response.data;
            const labels = [];
            const incomesData = [];
            const expensesData = [];

            monthlyIncomes.forEach(monthlyIncome => {
                monthlyIncome.items.forEach(item => {
                    labels.push(`${monthlyIncome.year}-${monthlyIncome.month}-${item.category}`);
                    incomesData.push(item.amount);
                });
            });

            monthlyExpenses.forEach(monthlyExpense => {
                monthlyExpense.items.forEach(item => {
                    labels.push(`${monthlyExpense.year}-${monthlyExpense.month}-${item.category}`);
                    expensesData.push(item.amount);
                });
            });

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Expenses',
                        data: incomesData,
                        backgroundColor: '#32CD32', // Dashboard Green
                    },
                    {
                        label: 'Incomes',
                        data: expensesData,
                        backgroundColor: 'rgba(0, 0, 0, 1)', // Hard Black
                    }
                ]
            });
        } catch (error) {
            console.error('Failed to fetch data:', error);
            alert('Failed to fetch data');
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data initially and on date changes
    }, [startDate, endDate]);

    const toggleChartType = () => {
        setChartType(prev => (prev === 'bar' ? 'pie' : 'bar'));
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.5,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        layout: {
            padding: 20
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 45
                }
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div>
            <div className="container">
                <div className="input-container">
                    <DatePicker className="input-field" selected={startDate} onChange={date => setStartDate(date)} dateFormat="yyyy/MM/dd" />
                    <DatePicker className="input-field" selected={endDate} onChange={date => setEndDate(date)} dateFormat="yyyy/MM/dd" />
                    <button className="report-button" onClick={toggleChartType}>
                        Switch Chart
                    </button>
                </div>
            </div>
            {Object.keys(chartData).length ? (
                <>
                    <h2 className="centered-text">Financial Data Chart</h2>
                    {chartType === 'bar' ? (
                        <Bar data={chartData} options={options} />
                    ) : (
                        <Pie data={chartData} options={options} />
                    )}
                </>
            ) : (
                <p className="message">Please generate Charts to see data here.</p>
            )}
        </div>
    );
};

export default Chart;
