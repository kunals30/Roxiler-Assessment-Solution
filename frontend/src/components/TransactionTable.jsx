import React from "react";

function TransactionTable({ transactions }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-purple-700">
          <tr>
            <th className="py-2 px-4 text-left text-lg text-white font-semibold">
              Title
            </th>
            <th className="py-2 px-4 text-left text-lg text-white font-semibold">
              Description
            </th>
            <th className="py-2 px-4 text-left text-lg text-white font-semibold">
              Price
            </th>
            <th className="py-2 px-4 text-left text-lg text-white font-semibold">
              Sold
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.total > 0 ? (
            transactions.data.map((transaction) => (
              <tr key={transaction._id} className="border-b-2">
                <td className="py-2 border-r-2 px-4">{transaction.title}</td>
                <td className="py-2 border-r-2 px-4">
                  {transaction.description}
                </td>
                <td className="py-2 border-r-2 px-4">
                  ${transaction.price.toFixed(2)}
                </td>
                <td className="py-2 border-r-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      transaction.sold
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {transaction.sold ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No transactions found for the selected month.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
