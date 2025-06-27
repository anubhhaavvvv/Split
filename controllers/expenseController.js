const Expense = require("../models/Expense");
const Group = require("../models/Group");
const User = require("../models/User");

exports.createExpense = async (req, res) => {
  const { description, amount, groupId } = req.body;

  try {
    const group = await Group.findById(groupId).populate("members");
    if (!group) return res.status(404).json({ message: "Group not found" });

    const splitAmount = amount / group.members.length;
    const splits = group.members.map((member) => ({
      user: member._id,
      amount: parseFloat(splitAmount.toFixed(2)),
    }));

    const expense = new Expense({
      description,
      amount,
      group: groupId,
      paidBy: req.user._id,
      splits,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create expense" });
  }
};

exports.getGroupExpenses = async (req, res) => {
  const { groupId } = req.params;
  try {
    const expenses = await Expense.find({ group: groupId })
      .populate("paidBy", "name")
      .populate("splits.user", "name");
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};
