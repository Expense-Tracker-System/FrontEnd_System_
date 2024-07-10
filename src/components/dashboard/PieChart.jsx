import React from 'react'
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const labels = ["januarry", "Februarry", "March", "May", "Juny"];
const data = {
    labels: labels,
    datasets: [
        {
            label: "My Income datasets",
            backgroundColor: "rgb(23,52,235)",
            borderColor: "rgb(248,250,249)",
            data: [0, 10, 5, 2, 20, 30, 45],
        },
        {
            label: "My Expense datasets",
            backgroundColor: "rgb(23,192,235)",
            borderColor: "rgb(248,250,249)",
            data: [3, 15, 25, 5, 10, 20, 35],
        },
    ],
};

function PieChart() {
    return (
        <div className='bg-white border border-secoundary'>
            <Pie data={data}></Pie>
        </div>
    )
}

export default PieChart
