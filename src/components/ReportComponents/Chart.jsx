import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../ReportComponents/chart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
    const [endDate, setEndDate] = useState(new Date());
    const [chartData, setChartData] = useState({});
    const [chartType, setChartType] = useState('bar');

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7026/api/FinancialReport/GetFinancialData', {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                }
            });

            const { monthlyIncomes, monthlyExpenses } = response.data;
            
            const processedData = processChartData(monthlyIncomes, monthlyExpenses);
            setChartData(processedData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            alert('Failed to fetch data');
        }
    };

    const processChartData = (incomes, expenses) => {
        const data = {
            labels: [],
            datasets: [
                {
                    label: 'Income',
                    data: [],
                   
                    backgroundColor: 'rgba(0, 128, 0, 1)',
                },
                {
                    label: 'Expense',
                    data: [],
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                   
                }
            ]
        };

        const months = [...new Set([...incomes.map(i => `${i.year}-${i.month}`), ...expenses.map(e => `${e.year}-${e.month}`)])].sort();

        months.forEach(month => {
            const [year, monthNum] = month.split('-');
            
            const monthIncome = incomes.find(i => i.year === parseInt(year) && i.month === parseInt(monthNum));
            const monthExpense = expenses.find(e => e.year === parseInt(year) && e.month === parseInt(monthNum));

            if (monthIncome) {
                monthIncome.items.forEach(item => {
                    data.labels.push(`${month} ${item.category}`);
                    data.datasets[0].data.push(item.amount);
                    data.datasets[1].data.push(0);
                });
            }

            if (monthExpense) {
                monthExpense.items.forEach(item => {
                    const existingLabelIndex = data.labels.indexOf(`${month} ${item.category}`);
                    if (existingLabelIndex !== -1) {
                        data.datasets[1].data[existingLabelIndex] = item.amount;
                    } else {
                        data.labels.push(`${month} ${item.category}`);
                        data.datasets[0].data.push(0);
                        data.datasets[1].data.push(item.amount);
                    }
                });
            }
        });

        return data;
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.5,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Income and Expenses by Category',
            },
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
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount'
                }
            }
        }
    };

    const toggleChartType = () => {
        setChartType(prev => prev === 'bar' ? 'pie' : 'bar');
    };

    return (
        <div>
        <div style={{ 
            padding: '20px', 
            width: '800px', 
            margin: '0 auto', 
            backgroundColor: '#f9f9f9', 
            boxShadow: '0 0 10px #0000001a', 
            borderRadius: '8px' 
        }}>
           <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '20px', 
    marginTop: '20px' 
}}>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    dateFormat="yyyy/MM/dd"
                />
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    dateFormat="yyyy/MM/dd"
                />
                <button className="report-button" onClick={toggleChartType}>
                    Switch to {chartType === 'bar' ? 'Pie' : 'Bar'} Chart
                </button>
            </div>
            </div>
            <div>
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
        </div>
    );
};

export default Chart;