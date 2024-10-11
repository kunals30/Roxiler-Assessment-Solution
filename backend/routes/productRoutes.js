// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  seedDatabase,
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
} = require("../controllers/productController");

router.get("/seed", seedDatabase);
router.get("/transactions", listTransactions);
router.get("/statistics", getStatistics);
router.get("/barchart", getBarChart);
router.get("/piechart", getPieChart);
router.get("/combined", getCombinedData);

module.exports = router;
