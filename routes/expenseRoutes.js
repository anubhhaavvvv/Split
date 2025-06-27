const express = require("express");
const { createExpense, getGroupExpenses } = require("../controllers/expenseController");

const router = express.Router();

router.post("/", createExpense);
router.get("/:groupId", getGroupExpenses);

module.exports = router;