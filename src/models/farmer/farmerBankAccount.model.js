const db = require("../../config/postgres");

const createFarmerBankAccount = async (bankData) => {
  const query = `INSERT INTO farmer_bank_accounts (farmer_id,account_number,bank_name,  account_holder_name,   created_at, updated_at) 
  VALUES ($1, $2, $3, $4,  NOW(), NOW()) RETURNING *`;
  const values = [
    bankData.farmer_id,
    bankData.account_number,
    bankData.bank_name,
    bankData.account_name,
  ];

  const response = await db.query(query, values);

  return response.rows[0];
};

module.exports = { createFarmerBankAccount };
