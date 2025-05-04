const db = require("../../config/postgres");

const RoleModel = {
  async createRole({ name, description }) {
    const query = `INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING *`;
    const values = [name, description];
    const response = await db.query(query, values);
    return response.rows[0];
  },

  async findRoleById(id) {
    const query = `SELECT * FROM roles WHERE id = $1`;

    const values = [id];

    const response = await db.query(query, values);

    return response.rows[0];
  },

  async getAllRoles() {
    const query = `SELECT * FROM roles ORDER BY id ASC`;

    const response = await db.query(query);

    return response.rows;
  },

  async updateRole(id, { name, description }) {
    const query = `UPDATE roles SET name = $1, description = $2 WHERE id = $3 RETURNING *`;
    const values = [name, description, id];
    const response = await db.query(query, values);
    return response.rows[0];
  },

  async deleteRole(id) {
    const query = `DELETE FROM roles WHERE id = $1 RETURNING *`;
    const values = [id];
    const response = await db.query(query, values);
    return response.rows[0];
  },
};

module.exports = RoleModel;
