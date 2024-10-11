import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function BarChart({ barChartData, month }) {
  const chartColors = [
    '#9966FF', 
    '#36A2EB', 
    '#FFCE56', 
    '#4BC0C0', 
    '#9966FF',
    '#FF9F40', 
  ];

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Range Distribution',
      },
    },
  };

  const barData = {
    ...barChartData,
    datasets: barChartData.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: chartColors[index % chartColors.length], // Cycle through custom colors
    })),
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-4 text-red-600">
        Price Range Distribution
      </h2>
      {barChartData.labels.length > 0 ? (
        <div className="w- h-80 mx-20">  {/* Adjusted width and height */}
          <Bar data={barData} options={barOptions} key={month} />
        </div>
      ) : (
        <p className="text-gray-500">No data available for the selected month in the bar chart.</p>
      )}
    </div>
  );
}

export default BarChart;
