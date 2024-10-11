// controllers/productController.js
const axios = require("axios");
const Product = require("../models/product");

const seedDatabase = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    // Clear existing data
    await Product.deleteMany();

    // Insert new data
    await Product.insertMany(data);

    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to seed database" });
  }
};

// List all transactions with pagination and search
const listTransactions = async (req, res) => {
  const { search, page = 1, perPage = 10, month } = req.query;

  let query = {};
  let monthQuery = {};

  if (month) {
    monthQuery = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)], // Extract the month from ISO 8601 date
      },
    };
  }

  if (search) {
    const searchAsNumber = Number(search); // Convert the search term to a number
    query.$or = [
      { title: { $regex: search.trim(), $options: "i" } },
      { description: { $regex: search.trim(), $options: "i" } },
      // {price: {$regex: search, $options: "i"}}, // Assuming price is a string for search
    ];
    if (!isNaN(searchAsNumber)) {
      query.$or.push({ price: searchAsNumber }); // This assumes you want exact matches on price
    }
  }

  let finalQuery = { ...monthQuery, ...query };

  try {
    const transactions = await Product.find(finalQuery)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    const totalCount = await Product.countDocuments(finalQuery);

    res.status(200).json({ data: transactions, total: totalCount });
  } catch (error) {
    console.error("Error fetching transactions:", error); // Log the actual error
    res.status(500).json({ error: "Error fetching transactions" });
  }
};

// Get statistics for the selected month
const getStatistics = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }

  if (month) {
    monthFilter = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)], // Extract the month from ISO 8601 date
      },
    };
  }

  try {
    const totalSales = await Product.aggregate([
      { $match: monthFilter },
      { $group: { _id: null, totalSalesAmount: { $sum: "$price" } } },
    ]);

    const totalSoldItems = await Product.countDocuments({
      ...monthFilter,
      sold: true,
    });
    const totalUnsoldItems = await Product.countDocuments({
      ...monthFilter,
      sold: false,
    });

    res.json({
      totalSalesAmount: totalSales[0]?.totalSalesAmount || 0,
      totalSoldItems,
      totalUnsoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};

// Get bar chart data for the selected month
const getBarChart = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }

  if (month) {
    monthFilter = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)], // Extract the month from ISO 8601 date
      },
    };
  }

  try {
    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const data = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Product.countDocuments({
          ...monthFilter,
          price: {
            $gte: range.min,
            $lt: range.max === Infinity ? Infinity : range.max,
          },
        });
        return { range: range.range, count };
      })
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bar chart data" });
  }
};

// Get pie chart data for the selected month
const getPieChart = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }

  if (month) {
    monthFilter = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)], // Extract the month from ISO 8601 date
      },
    };
  }

  try {
    const categories = await Product.aggregate([
      { $match: monthFilter },
      { $group: { _id: "$category", itemCount: { $sum: 1 } } },
    ]);

    const formattedData = categories.map((category) => ({
      category: category._id,
      items: category.itemCount,
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pie chart data" });
  }
};

// Get combined data for the selected month
const getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const transactions = await listTransactions(req, res);
    const statistics = await getStatistics(req, res);
    const barChart = await getBarChart(req, res);
    const pieChart = await getPieChart(req, res);

    res.json({ transactions, statistics, barChart, pieChart });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch combined data" });
  }
};

module.exports = {
  seedDatabase,
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
};
