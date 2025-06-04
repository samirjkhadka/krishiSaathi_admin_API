const createExpenseModel = require("../../models/expenses/expenses.model");

const createExpenseService = async (data, userId) => {
  const result = await createExpenseModel(data, userId);
  return result;
};

module.exports = { createExpenseService };
