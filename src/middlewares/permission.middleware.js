const db = require("../config/postgres");
const { failResponse, errorResponse } = require("../utils/responseFormatter");

const checkPermission = async (req, res, next) => {
  const requiredPermission = req.headers["x-permission"];

  if (!requiredPermission) {
    return failResponse(res, {
      status: false,
      message: "Permission not provided in request",
      data: {},
      statusCode: 400,
    });
  }

  try {
    const { role_id, role } = req.user;

    // SuperAdmin Bypass: If role name is "superadmin", allow all actions
    if (role && role.toLowerCase() === "superadmin") {
      return next();
    }

    // Fetch permissions for this user's role
    const query = `
      SELECT p.name
      FROM role_permissions rp
      JOIN permissions p ON rp.permission_id = p.id
      WHERE rp.role_id = $1
    `;
    const { rows } = await db.query(query, [role_id]);
    const userPermissions = rows.map((row) => row.name);

    if (!userPermissions.includes(requiredPermission)) {
      return failResponse(res, {
        status: false,
        message: "Forbidden: You do not have permission to perform this action",
        data: {},
        statusCode: 403,
      });
    }

    next();
  } catch (err) {
    console.error("Permission Check Error:", err);
    return errorResponse(res, {
      status: false,
      message: "Internal Server Error",
      data: {},
      statusCode: 500,
    });
  }
};

module.exports = checkPermission;
