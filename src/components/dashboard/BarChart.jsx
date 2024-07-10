import React from 'react'
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const labels = ["januarry", "Februarry", "March", "May", "Juny"];
const data = {
    labels: labels,
    datasets: [
        {
            label: "My Income datasets",
            backgroundColor: "rgb(12,25,201)",
            borderColor: "rgb(25,99,132)",
            data: [0, 10, 5, 2, 20, 30, 45],
        },
        {
            label: "My Expense datasets",
            backgroundColor: "rgb(15,178,238)",
            borderColor: "rgb(25,99,132)",
            data: [5, 15, 2, 7, 10, 20, 55],
        },
    ],
};

function Barchart() {
    return (
        <div className='bg-white border border-secoundary'>
            <Bar data={data}></Bar>
        </div>
    )
}

export default Barchart;
