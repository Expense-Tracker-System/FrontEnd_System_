import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["2000", "2005", "2010", "2015", "2020"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My Expense datasets",
      backgroundColor: "rgb(12,25,201)",
      borderColor: "rgb(25,99,132)",
      color: "rgb(12,25,201)",
      data: [5, 10, 50, 2, 10, 30, 70],
    },
  ],
};

function LinechartE() {
  return (
    <div className="bg-white border border-secoundary">
      <Line data={data}></Line>
    </div>
  );
}

export default LinechartE;
