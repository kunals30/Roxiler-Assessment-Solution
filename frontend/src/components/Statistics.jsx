import React from "react";

function Statistics({ statistics, month }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-12 text-red-600">
        Statistics for{" "}
        {new Date(2023, month - 1).toLocaleString("default", { month: "long" })}
      </h2>
      <div className=" flex justify-around">
        <p className="text-xl text-white p-4 rounded-lg shadow-md bg-blue-800 ">
          <span className="font-semibold">Total Sales Amount:</span> $
          {statistics.totalSalesAmount?.toFixed(2) || 0}
        </p>
        <p className="text-xl text-white p-4 rounded-lg shadow-md bg-green-500">
          <span className="font-semibold">Total Sold Items:</span>{" "}
          {statistics.totalSoldItems || 0}
        </p>
        <p className="text-xl text-white p-4 rounded-lg shadow-md bg-red-500">
          <span className="font-semibold">Total Unsold Items:</span>{" "}
          {statistics.totalUnsoldItems || 0}
        </p>
      </div>
    </div>
  );
}

export default Statistics;
