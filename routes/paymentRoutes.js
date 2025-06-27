
const express = require("express");
const { recordPayment, getGroupBalances } = require("../controllers/paymentController");

const router = express.Router();

router.post("/pay", recordPayment);
router.get("/balances/:groupId", getGroupBalances);

module.exports = router;