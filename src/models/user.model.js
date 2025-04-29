const pool = require("../config/postgres");

const getAllUsers = async () => {
  const response = await pool.query("SELECT * FROM users");
  return response.rows[0];
};

const findUserById = async (id) => {
  const response = await pool.query("SELECT * FROM admin_users WHERE id = $1", [id]);
  return response.rows[0];
};

const createUser = async (user) => {
  const { username, email, password, twoFactorEnabled, twoFactorSecret } = user;
  const result = await pool.query(
    `INSERT INTO users (username, email, password, two_factor_enabled, two_factor_secret) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, two_factor_enabled, two_factor_secret`,
    [
      username,
      email,
      password,
      twoFactorEnabled || false,
      twoFactorSecret || null,
    ]
  );

  const response = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [user.name, user.email, user.password]
  );
  return response.rows[0];
};

const findUserByUsername = async (username) => {

  const response = await pool.query(`SELECT * FROM admin_users WHERE username = $1`, [
    username
  ]);

  if(response.rows.length === 0){
   console.warn('No User found for : ', username)
   return null;
  }
 
  return response.rows[0];
};

const updateUserTwoFactor = async (id, twoFactorEnabled, twoFactorSecret) => {
  const response = await pool.query(
    "UPDATE admin_users SET is_2fa_enabled = $1, two_fa_secret = $2 WHERE id = $3 RETURNING *",
    [twoFactorEnabled, twoFactorSecret, id]
  );
  return response.rows[0];
};

module.exports = {
  getAllUsers,
  findUserById,
  createUser,
  findUserByUsername,
  updateUserTwoFactor,
};
