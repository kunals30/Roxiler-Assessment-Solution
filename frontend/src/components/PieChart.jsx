import React from "react";
import { Pie } from "react-chartjs-2";
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

function PieChart({ pieChartData, month }) {
  const chartColors = [
    "#FF6384", // Pinkish Red
    "#36A2EB", // Light Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FF9F40", // Orange
  ];

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to resize
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Items by Category",
      },
    },
  };

  const pieData = {
    ...pieChartData,
    datasets: pieChartData.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: chartColors, // Use custom color scheme
    })),
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-4 text-red-600">
        Items by Category
      </h2>
      {pieChartData.labels.length > 0 ? (
        <div className="w-96 h-96 mx-auto">
          {" "}
          {/* Made the pie chart bigger */}
          <Pie data={pieData} options={pieOptions} key={month} />
        </div>
      ) : (
        <p className="text-gray-500">
          No data available for the selected month in the pie chart.
        </p>
      )}
    </div>
  );
}

export default PieChart;
