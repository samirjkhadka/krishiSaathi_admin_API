const RoleService = require("../../services/rbac/role.service");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseFormatter");

const RoleController = {
  async createRole(req, res) {
    if (!req.body) {
      return res.status(400).json({ message: "Invalid Request" });
    }

    try {
      const { name, description } = req.body;
      const role = await RoleService.createRole({ name, description });
      return successResponse(res, {
        status: true,
        message: "Role Created Successfully",
        data: role,
        statusCode: 200,
      });
    } catch (error) {
      return errorResponse(res, {
        status: false,
        message: "Role Creation Failed: " + error.message,
        data: {},
        statusCode: 500,
      });
    }
  },

  async getRoleById(req, res) {
    const { id } = req.params;
      console.log(id);
    try {
      const role = await RoleService.getRoleById(id);
      return successResponse(res, {
        status: true,
        message: "Role Fetched Successfully",
        data: role,
        statusCode: 200,
      });
    } catch (error) {
      return errorResponse(res, {
        status: false,
        message: "Role Fetching Failed: " + error.message,
        data: {},
        statusCode: 500,
      });
    }
  },

  async updateRole(req, res) {
    if (!req.body) {
      return res.status(400).json({ message: "Invalid Request" });
    }

    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const role = await RoleService.updateRole(id, { name, description });
      return       successResponse(res, {
          status: true,
          message: "Role Updated Successfully",
          data: role,
          statusCode: 200,
        })
   
    } catch (error) {
      return errorResponse(res, {
          status: false,
          message: "Role Update Failed: " + error.message,
          data: {},
          statusCode: 500,
        })
    
    }
  },

  async deleteRole(req, res) {
    const { id } = req.params;
    try {
      const role = await RoleService.deleteRole(id);
      return res(
        successResponse(res, {
          status: true,
          message: "Role Deleted Successfully",
          data: role,
          statusCode: 200,
        })
      );
    } catch (error) {
      return res(
        errorResponse(res, {
          status: false,
          message: "Role Deletion Failed: " + error.message,
          data: {},
          statusCode: 500,
        })
      );
    }
  },

  async findAllRoles(req, res) {
    try {
      const roles = await RoleService.getAllRoles();

      return successResponse(res, {
        status: true,
        message: "Pending admin users fetched successfully",
        data: roles,
        statusCode: 200,
      });
    } catch (error) {
      return;
      errorResponse(res, {
        status: false,
        message: "Roles Fetching Failed: " + error.message,
        data: {},
        statusCode: 500,
      });
    }
  },
};

module.exports = RoleController;
