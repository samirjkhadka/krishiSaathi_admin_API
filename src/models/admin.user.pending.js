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

const findAllPending = async ({ page, limit, search }) => {
  const offset = (page - 1) * limit;
  let query, countQuery, values, countValues;

  if (search) {
    query = `
      SELECT *
      FROM admin_users_pending
      WHERE 
        LOWER(name) LIKE $1 OR
        LOWER(email) LIKE $1 OR
        phone LIKE $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;
    values = [`%${search.toLowerCase()}%`, limit, offset];

    countQuery = `
      SELECT COUNT(*) AS total
      FROM admin_users_pending
      WHERE 
        LOWER(name) LIKE $1 OR
        LOWER(email) LIKE $1 OR
        phone LIKE $1
    `;
    countValues = [`%${search.toLowerCase()}%`];
  } else {
    query = `
      SELECT *
      FROM admin_users_pending
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    values = [limit, offset];

    countQuery = `
      SELECT COUNT(*) AS total
      FROM admin_users_pending
    `;
    countValues = [];
  }

  const [result, countResult] = await Promise.all([
    db.query(query, values),
    db.query(countQuery, countValues),
  ]);

  const totalCount = parseInt(countResult.rows[0].total, 10);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    page,
    limit,
    totalCount,
    totalPages,
    users: result.rows,
  };
};

module.exports = { insert, findAllPending };
