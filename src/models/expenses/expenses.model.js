const pool = require("../../config/postgres");

const createExpenseModel = async (data) => {
  console.log(data);
  const { title, amount, category, userId } = data;

  const response = await pool.query(
    `Insert into exp_transactions (title, amount, category, user_id, created_by) values ($1, $2, $3, $4, $5) RETURNING *`,
    [title, amount, category, userId, userId]
  );

  return response.rows[0];
};

module.exports = createExpenseModel;
