const {
  seedPermissions,
  getPermissions,
} = require("../../services/rbac/permissions.service");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseFormatter");

const insertPermissions = async (req, res) => {
  try {
    const result = await seedPermissions();
    return successResponse(res, {
      status: true,
      message: "Permissions seeded successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Error seeding permissions",
      data: {},
      statusCode: 500,
    });
  }
};

const getAllPermissions = async (req, res) => {
  try {
    const permissions = await getPermissions();
    res.status(200).json({ status: true, data: permissions });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching permissions",
      error: error.message,
    });
  }
};

module.exports = {
  insertPermissions,
  getAllPermissions,
};
