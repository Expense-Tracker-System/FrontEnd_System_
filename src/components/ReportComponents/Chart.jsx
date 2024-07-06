import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './chart.css';  // Make sure your CSS is correctly linked

const Chart = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
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
            const { incomes, expenses } = response.data;
            setChartData({
                labels: incomes.map(item => item.category),
                datasets: [
                    {
                        label: 'Incomes',
                        data: incomes.map(item => item.amount),
                        backgroundColor: 'rgba(0, 0, 139, 0.5)', // Changed to dark blue
                    },
                    {
                        label: 'Expenses',
                        data: expenses.map(item => item.amount),
                        backgroundColor: 'rgba(173, 216, 230, 0.5)', // Light blue (white-blue)
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
        }
    };

    return (
        <div>
            <div className="container">
                <DatePicker className="input-field" selected={startDate} onChange={date => setStartDate(date)} dateFormat="yyyy/MM/dd" />
                <DatePicker className="input-field" selected={endDate} onChange={date => setEndDate(date)} dateFormat="yyyy/MM/dd" />
                <button className="report-button" onClick={toggleChartType}>
                    Switch Chart
                </button>
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
                <p className="message">Please generate a report to see data here.</p>
            )}
        </div>
    );
};

export default Chart;

