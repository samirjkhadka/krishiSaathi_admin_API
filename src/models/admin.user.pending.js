const db = require("../config/postgres");

const insert = async (data) => {
  const query = `
    INSERT INTO admin_users_pending
    (name, email, phone, role, password, created_by, action, role_id, username)
    VALUES ($1, $2, $3, $4, $5, $6,$7, $8, $9)
    RETURNING id`;

  const values = [
    data.name,
    data.email,
    data.phone,
    data.role,
    data.password,
    data.created_by,
    data.action,
    data.role_id,
    data.username,
  ];
  const response = await db.query(query, values);
  return response.rows[0];
};


const findAllPending = async () => {
  const query = `SELECT aup.*, 
      au.name AS created_by_name 
    FROM admin_users_pending aup
    LEFT JOIN admin_users au ON aup.created_by = au.id
    WHERE aup.action = 'create'
    ORDER BY aup.created_at DESC; `;
  const result = await db.query(query);
  return result.rows;
};

module.exports = { insert, findAllPending };
