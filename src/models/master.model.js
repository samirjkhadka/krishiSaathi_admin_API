const db = require("../config/postgres");

const getMastersByType = async (type, parentId) => {
  console.log(type, parentId);
  const query = parentId
    ? "SELECT * FROM masters WHERE type = $1 AND parent_id = $2 AND is_active = true"
    : "SELECT * FROM masters WHERE type = $1 AND is_active = true";
  const values = parentId ? [type, parentId] : [type];
  console.log(query, values);

  const rows = await db.query(query, values);

  return rows.rows;
};

module.exports = {
  getMastersByType,
};
