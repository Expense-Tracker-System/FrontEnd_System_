import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

function MultiColorProgressBar() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "doughnut",
      data: {
        labels: ["Investment", "Expenses", "Income", "Offers", "Others"],
        datasets: [
          {
            data: [120, 200, 100, 50, 100],
            backgroundColor: [
              "rgb(247, 16, 55)",
              "rgb(54, 162, 235)",
              "rgb(86, 247, 16)",
              "rgb(255, 205, 86)",
              "rgb(247, 240, 16)",
            ],
          },
        ],
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} style={{ width: "300px", height: "100px" }} />
    </div>
  );
}

export default MultiColorProgressBar;
