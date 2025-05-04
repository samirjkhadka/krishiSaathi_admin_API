const {
  assignPermissions,
  removePermissions,
  fetchPermissionsByRole,
} = require("../../services/rbac/rolePermission.service");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseFormatter");

const assignPermissionToRole = async (req, res) => {
  const { roleId, permissionIds } = req.body;

  console.log(roleId, permissionIds);
  if (!roleId || !Array.isArray(permissionIds)) {
    return errorResponse(res, {
      status: false,
      message: "Invalid Request",
      data: {},
      statusCode: 400,
    });
  }

  try {
    const result = await assignPermissions(roleId, permissionIds);
    return successResponse(res, {
      status: true,
      message: "Permissions assigned to role successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Error assigning permissions to role: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

const removePermissionsFromRole = async (req, res) => {
  const { roleId, permissionIds } = req.body;

  if (!roleId || !Array.isArray(permissionIds)) {
    return errorResponse(res, {
      status: false,
      message: "Invalid Request",
      data: {},
      statusCode: 400,
    });
  }

  try {
    const result = await removePermissions(roleId, permissionIds);
    return successResponse(res, {
      status: true,
      message: "Permissions removed from role successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Error removing permissions from role: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

const getPermissionsForRole = async (req, res) => {
  const roleId = req.params.roleId;

  try {
    const result = await fetchPermissionsByRole(roleId);
    return successResponse(res, {
      status: true,
      message: "Permissions fetched successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Error fetching permissions: " + error.message,
      data: {error},
      statusCode: 500,
    });
  }
};

module.exports = {
  assignPermissionToRole,
  removePermissionsFromRole,
  getPermissionsForRole,
};
