const Payment = require("../models/Payment");
const calculateBalances = require("../utils/calculateBalances");

exports.recordPayment = async (req, res) => {
  const { groupId, to, amount, note } = req.body;

  try {
    const payment = new Payment({
      group: groupId,
      from: req.user._id,
      to,
      amount,
      note,
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment failed" });
  }
};
exports.getGroupBalances = async (req, res) => {
  const { groupId } = req.params;
  try {
    const balances = await calculateBalances(groupId);
    res.json(balances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch balances" });
  }
};