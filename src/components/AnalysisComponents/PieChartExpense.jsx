import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function PieChartExpense() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["January", "February", "May", "Juny"],
        datasets: [
          {
            data: [120, 200, 100, 50],
            backgroundColor: [
              "rgb(247, 16, 55)",
              "rgb(54, 162, 235)",
              "rgb(86, 247, 16)",
              "rgb(255, 205, 86)",
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
      <canvas ref={chartRef} style={{ width: "300px", height: "200px" }} />
    </div>
  );
}

export default PieChartExpense;
