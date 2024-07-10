import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["januarry", "Februarry", "March", "May", "Juny", "July"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My Investment datasets",
      backgroundColor: "rgb(12,25,201)",
      borderColor: "rgb(25,99,132)",
      color: "rgb(12,25,201)",
      data: [10, 5, 20, 2, 20, 60],
    },
    {
      label: "My Expense datasets",
      backgroundColor: "rgb(252,11,43)",
      borderColor: "rgb(252,11,43)",
      color: "rgb(252,11,43)",
      data: [0, 50, 100, 80, 90, 300, 200],
    },
    {
      label: "My Income datasets",
      backgroundColor: "rgb(52,252,11)",
      borderColor: "rgb(52,252,11)",
      color: "rgb(52,252,11)",
      data: [0, 100, 500, 200, 150, 300, 200],
    },
  ],
};

function MulChartLine() {
  return (
    <div className="bg-white border border-secoundary">
      <Line data={data}></Line>
    </div>
  );
}

export default MulChartLine;
