import { Chart as chartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Ticks } from "chart.js";
import { Line } from 'react-chartjs-2';

chartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const UserChartSection = ({ usersList }) => {
    const chartLabels = ['admin','user'];
    const chartValues = [];

    const adminsCount = usersList.filter((q) => q.roles.includes('Admin')).length;
    chartValues.push(adminsCount);
    const usersCount = usersList.filter((q) => q.roles.includes('User')).length;
    chartValues.push(usersCount);

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                grid: { display: false }
            },
            y: {
                ticks: { stepSize: 5 }
            },
        },
    };

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'count',
                data: chartValues,
                borderColor: '#754eb475',
                backgroundColor: '#754eb4',
                pointBorderColor: 'transparent',
                tension: 0.25,
            },
        ],
    };

    return (
        <div className="col-span-1 lg-:col-span-3 bg-white p-2 rounded-md">
            <h1 className="text-xl font-bold mb-2">Users Chart</h1>
            <Line options={chartOptions} data={chartData} className="bg-white p-2 rounded-md" />
        </div>
    )
}

export default UserChartSection