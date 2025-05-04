const db = require("../../config/postgres");

const insertPermission = async (name, description) => {
  const query = `INSERT INTO permissions (name, description) VALUES ($1, $2) RETURNING *`;
  const values = [name, description];

  const response = await db.query(query, values);

  return response.rows[0];
};

const findAllPermissions = async () => {
  const result = await db.query(`SELECT * FROM permissions ORDER BY id ASC`);
  return result.rows;
};

module.exports = {
  insertPermission,
  findAllPermissions,
};
