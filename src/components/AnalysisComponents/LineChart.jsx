import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["januarry", "Februarry", "March", "May", "Juny"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My Income datasets",
      backgroundColor: "rgb(12,25,201)",
      borderColor: "rgb(25,99,132)",
      color: "rgb(12,25,201)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

function Linechart() {
  return (
    <div className="bg-white border border-secoundary">
      <Line data={data}></Line>
    </div>
  );
}

export default Linechart;
