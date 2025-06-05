const createExpenseModel = require("../../models/expenses/expenses.model");

const createExpenseService = async (data, userId) => {
  const result = await createExpenseModel.createExpenseModel(data, userId);
  return result;
};

const getAllExpenseService = async (data, userId) => {
  const result = await createExpenseModel.getAllExpensesModel(userId);
  return result;
};

const getExpensesByIdService = async (id) => {
  const result = await createExpenseModel.getExpensesById(id);
  return result;
};

const getExpensesByUserIdService = async (userId) => {
  const result = await createExpenseModel.getExpensesByUserId(userId);
  return result;
};

const deleteExpenseService = async (id) => {
  const result = await createExpenseModel.deleteExpenseModel(id);
  return result;
};

const getExpensesSummaryService = async (userId) => {
  const result = await createExpenseModel.getExpensesSummary(userId);
  console.log(result);
  return result;
};

module.exports = {
  createExpenseService,
  getAllExpenseService,
  getExpensesByIdService,
  getExpensesByUserIdService,
  deleteExpenseService,
  getExpensesSummaryService,
};
