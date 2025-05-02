const db = require("../config/postgres");

const logAction = async ({ client, userId, action, details }) => {
    console.log(client, userId, action, details);

  await db.query(
    `INSERT INTO user_activity_logs (user_id, action, description, created_at)
       VALUES ($1, $2, $3, NOW())`,
    [userId, action, details]
  );
};

module.exports = logAction;
