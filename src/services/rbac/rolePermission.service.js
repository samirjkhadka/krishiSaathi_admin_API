const {
  getPermissionByRole,
  removePermissionFromRole,
  assignPermissionToRole,
} = require("../../models/rbac/rolePermission.model");

const assignPermissions = async (getRoleById, permissionIds) => {
  for (const permissionId of permissionIds) {
    await assignPermissionToRole(getRoleById, permissionId);
  }
  return { message: "Permissions assigned to role successfully" };
};

const removePermissions = async (getRoleById, permissionIds) => {
  for (const permissionId of permissionIds) {
    await removePermissionFromRole(getRoleById, permissionId);
  }
  return { message: "Permissions removed from role successfully" };
};

const fetchPermissionsByRole = async (getRoleById) => {
  return await getPermissionByRole(getRoleById);
};

module.exports = {
  assignPermissions,
  removePermissions,
  fetchPermissionsByRole,
};
