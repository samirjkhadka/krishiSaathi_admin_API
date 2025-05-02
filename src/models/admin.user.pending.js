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
      SELECT p.*, u.name AS created_by_name
      FROM admin_users_pending p
      LEFT JOIN admin_users u ON p.created_by = u.id
      WHERE 
        LOWER(p.name) LIKE $1 OR
        LOWER(p.email) LIKE $1 OR
        p.phone LIKE $1
      ORDER BY p.created_at DESC
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
      SELECT p.*, u.name AS created_by_name
      FROM admin_users_pending p
      LEFT JOIN admin_users u ON p.created_by = u.id
      ORDER BY p.created_at DESC
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
    users: result.rows.map((user) => ({
      ...user,
      created_by_name: user.created_by_name || null,
      created_at: user.created_at,
    })),
  };
};

const approvePendingUser = async (id, approverId) => {
  try {
    const result = await db.query("BEGIN");

    const pendingResult = await db.query(
      "SELECT * FROM admin_users_pending WHERE id = $1 AND status = $2",
      [id, "pending"]
    );

    const pendingUser = pendingResult.rows[0];

    if (!pendingUser) {
      await db.query("ROLLBACK");
      throw new Error("Pending User not found or already processed");
    }

    const insertResult = await db.query(
      `INSERT INTO admin_users (
        id, name, email, phone, role, password_hash, role_id,
        created_by, created_at, username, is_active
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6,
        $7, $8, $9, true
      ) RETURNING *`,
      [
        pendingUser.name,
        pendingUser.email,
        pendingUser.phone,
        pendingUser.role,
        pendingUser.password,
        pendingUser.role_id,
        pendingUser.created_by,
        pendingUser.created_at,
        pendingUser.username,
      ]
    );
    const approvedUser = insertResult.rows[0];

    await db.query(
      `INSERT INTO admin_user_action_logs (
    action, performed_by, target_user_id, status, remarks
  ) VALUES ($1, $2, $3, $4, $5)`,
      ["approve", approverId, approvedUser.id, "success", null]
    );

    await db.query(`DELETE FROM admin_users_pending WHERE id = $1`, [
      pendingUser.id,
    ]);

    await db.query("COMMIT");
    return {
      approvedUser,
      deletedPendingUser: pendingUser,
    };
  } catch (err) {
    await db.query("ROLLBACK");
    throw err;
  }
};

const rejectPendingUser = async (id, rejecterId, remarks) => {
  console.log(id, rejecterId, remarks);
  try {
    await db.query("BEGIN");

    const result = await db.query(
      ` UPDATE admin_users_pending
       SET status = $1,
           rejected_at = NOW(),
           checked_by = $2,
           checked_at = NOW(),
           remarks = $3
       WHERE id = $4 AND status = 'pending'
       RETURNING *`,
      ["rejected", rejecterId, remarks, id]
    );

    const rejectedUser = result.rows[0];

    if (!rejectedUser) {
      throw new Error("Pending user not found or already processed");
    }

    await db.query(
      `INSERT INTO admin_user_action_logs (
         action,pending_user_id, performed_by,  status, remarks
       ) VALUES ($1, $2, $3, $4, $5)`,
      ["reject", id, rejecterId, "success", remarks]
    );

    await db.query("COMMIT");

    return rejectedUser;
  } catch (err) {
    await db.query("ROLLBACK");
    throw err;
  }
};

const updateRejectedPendingUser = async (id, updatedData) => {
  const {
    name,
    email,
    phone,
    role,
    password,
    created_by,
    action,
    role_id,
    username,
  } = updatedData;

  const query = `
  UPDATE admin_users_pending
  SET 
    name = $1,
    email = $2,
    phone = $3,
    role = $4,
    password = $5,
    role_id = $6,
    username = $7,
    updated_at = CURRENT_TIMESTAMP,
    status = 'pending',
    remarks = NULL,
    checked_by = NULL,
    checked_at = NULL
  WHERE id = $8 AND status = 'rejected'
  RETURNING *;
`;

  const values = [name, email, phone, role, password, role_id, username, id];

  const result = await db.query(query, values);
  return result.rows[0];
};
module.exports = {
  insert,
  findAllPending,
  approvePendingUser,
  rejectPendingUser,
  updateRejectedPendingUser
};
