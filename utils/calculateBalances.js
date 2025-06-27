// utils/calculateBalances.js

const calculateBalances = (expenses, payments, members) => {
  const balanceMap = {};

  members.forEach((userId) => {
    balanceMap[userId] = 0;
  });

  // Calculate balances from expenses
  expenses.forEach((expense) => {
    const { paidBy, amount, splitAmong } = expense;
    const share = amount / splitAmong.length;

    splitAmong.forEach((userId) => {
      if (userId !== paidBy.toString()) {
        balanceMap[userId] -= share;
        balanceMap[paidBy] += share;
      }
    });
  });

  // Adjust balances from payments
  payments.forEach((payment) => {
    balanceMap[payment.paidBy] -= payment.amount;
    balanceMap[payment.paidTo] += payment.amount;
  });

  return balanceMap;
};

module.exports = calculateBalances;
