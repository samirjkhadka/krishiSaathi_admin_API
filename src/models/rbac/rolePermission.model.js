const db = require("../../config/postgres");

const assignPermissionToRole = async (getRoleById, permissionId) => {
  const query = `INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *`;
  const values = [getRoleById, permissionId];
  const response = await db.query(query, values);
  return response.rows[0];
};

const removePermissionFromRole = async (getRoleById, permissionId) => {
  const query = `DELETE FROM role_permissions WHERE role_id = $1 AND permission_id = $2 RETURNING *`;
  const values = [getRoleById, permissionId];
  const response = await db.query(query, values);
  return response.rows[0];
};

const getPermissionByRole = async (getRoleById) => {
  const query = `SELECT p.id, p.name, p.description
    FROM role_permissions rp
    JOIN permissions p ON rp.permission_id = p.id
    WHERE rp.role_id = $1`;
  const values = [getRoleById];
  const response = await db.query(query, values);
  return response.rows[0];
};

module.exports = {
  assignPermissionToRole,
  removePermissionFromRole,
  getPermissionByRole,
};
