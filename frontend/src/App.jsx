import React, { useState, useEffect } from "react";
import TransactionTable from "./components/TransactionTable";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import Statistics from "./components/Statistics";
import axios from "axios";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [month, setMonth] = useState("3");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetchTransactions();
    fetchBarChart();
    fetchPieChart();
    fetchStatistics();
  }, [month, page, search]);

  const fetchTransactions = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/products/transactions",
      {
        params: { month, page, search },
      }
    );
    setTransactions(response.data);
  };

  const fetchStatistics = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/products/statistics",
      { params: { month } }
    );
    setStatistics(response.data);
  };

  const fetchBarChart = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/products/barchart",
      {
        params: { month },
      }
    );
    const labels = response.data.map((item) => item.range);
    const data = response.data.map((item) => item.count);
    setBarChartData({
      labels,
      datasets: [
        {
          label: "Number of Items",
          data,
          backgroundColor: "rgba(75,192,192,1)",
        },
      ],
    });
  };

  const fetchPieChart = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/products/piechart",
      {
        params: { month },
      }
    );
    const labels = response.data.map((item) => item.category);
    const data = response.data.map((item) => item.items);
    setPieChartData({
      labels,
      datasets: [
        {
          label: "Items by Category",
          data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    });
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Transactions Dashboard
      </h1>

      <div className="flex flex-col md:flex-row justify-center mb-4 gap-4">
        {/* Month Selector */}
        <h3 className="flex  items-center">Select Month:</h3>
        <select
          value={month}
          onChange={handleMonthChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm bg-white"
        >
          {[
            { name: "January", number: "1" },
            { name: "February", number: "2" },
            { name: "March", number: "3" },
            { name: "April", number: "4" },
            { name: "May", number: "5" },
            { name: "June", number: "6" },
            { name: "July", number: "7" },
            { name: "August", number: "8" },
            { name: "September", number: "9" },
            { name: "October", number: "10" },
            { name: "November", number: "11" },
            { name: "December", number: "12" },
          ].map((monthObj) => (
            <option
              key={monthObj.number}
              value={monthObj.number}
              className="p-2 bg-white hover:bg-blue-100"
            >
              {monthObj.name}
            </option>
          ))}
        </select>

        {/* Search Box */}
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search Transactions"
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full md:w-auto"
        />
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto shadow-sm border border-gray-300 rounded-md">
        <TransactionTable transactions={transactions} />
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
        >
          Next
        </button>
      </div>

      {/* Statistics Section */}
      <div className="mt-8 bg-white shadow-sm rounded-md p-4">
        <Statistics statistics={statistics} month={month} />
      </div>

      {/* Bar Chart */}
      <div className="mt-8 bg-white shadow-sm rounded-md p-4">
        <BarChart barChartData={barChartData} month={month} />
      </div>

      {/* Pie Chart */}
      <div className="mt-8 bg-white shadow-sm rounded-md p-4">
        <PieChart pieChartData={pieChartData} month={month} />
      </div>
    </div>
  );
};

export default App;
