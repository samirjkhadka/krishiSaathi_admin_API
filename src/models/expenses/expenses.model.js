const pool = require("../../config/postgres");

const createExpenseModel = async (data) => {
  const { title, amount, category, userId } = data;

  const response = await pool.query(
    `Insert into exp_transactions (title, amount, category, user_id, created_by) values ($1, $2, $3, $4, $5) RETURNING *`,
    [title, amount, category, userId, userId]
  );

  return response.rows[0];
};

const getAllExpensesModel = async (userId) => {
  const response = await pool.query(
    `SELECT * FROM exp_transactions WHERE user_id = $1`,
    [userId]
  );
  return response.rows;
};

const getExpensesById = async (id) => {
  const response = await pool.query(
    `SELECT * FROM exp_transactions WHERE id = $1`,
    [id]
  );
  return response.rows[0];
};

const getExpensesByUserId = async (userId) => {
  const user_id = "9457e173-516a-4dd2-b56e-4ec9e5642843";
  const response = await pool.query(
    `SELECT * FROM exp_transactions WHERE user_id = $1`,
    [user_id]
  );

  return response.rows;
};

const deleteExpenseModel = async (id) => {
  const response = await pool.query(
    `DELETE FROM exp_transactions WHERE id = $1`,
    [id]
  );
  return response.rows[0];
};

const getExpensesSummary = async (userId) => {
  const balanceResult = await pool.query(
    `SELECT sum(amount) as balance FROM exp_transactions WHERE user_id = $1`,
    [userId]
  );

  const incomeResult = await pool.query(
    `SELECT sum(amount) as income FROM exp_transactions WHERE user_id = $1 and amount > 0`,
    [userId]
  );

  const expenseResult = await pool.query(
    `SELECT sum(amount) as expenses FROM exp_transactions WHERE user_id = $1 and amount < 0`,
    [userId]
  );

  return {
    balance: balanceResult.rows[0].balance,
    income: incomeResult.rows[0].income,
    expenses: expenseResult.rows[0].expenses,
  };
};

module.exports = {
  createExpenseModel,
  getAllExpensesModel,
  getExpensesById,
  getExpensesByUserId,
  deleteExpenseModel,
  getExpensesSummary,
};
