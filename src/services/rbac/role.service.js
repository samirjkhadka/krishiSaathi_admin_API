const RoleModel = require("../../models/rbac/role.model");

const RoleService = {
  async createRole(data) {
    return await RoleModel.createRole(data);
  },

  async getAllRoles() {
    return await RoleModel.getAllRoles();
  },

  async getRoleById(id) {
    return await RoleModel.findRoleById(id);
    if (!role) {
      throw new Error("Role not found");
    }
    return role;
  },

  async updateRole(id, data) {
    return await RoleModel.updateRole(id, data);
    id(!role);
    {
      throw new Error("Role not found or Update Failed");
    }
    return role;
  },

  async deleteRole(id) {
    const role = await RoleModel.deleteRole(id);
    if (!role) {
      throw new Error("Role not found or Delete Failed");
    }
    return role;
  },
};

module.exports = RoleService;