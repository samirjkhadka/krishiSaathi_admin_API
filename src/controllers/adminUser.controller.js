const {
  createPendingAdminUser,
  getPendingAdminUsers,
} = require("../services/admin.user.service");
const {
  errorResponse,
  successResponse,
  failResponse,
} = require("../utils/responseFormatter");

const createAdminUserRequest = async (req, res) => {
  try {
    const makerId = req.user.id;

    const { name, email, phone, role, role_id, username, password } = req.body;

    if (!name || !email || !username || !password) {
      return failResponse(res, {
        status: false,
        message: "All Fields are required",
        data: {},
        statusCode: 400,
      });
    }

    const result = await createPendingAdminUser({
      name,
      email,
      phone,
      role,
      role_id,
      username,
      password,
      created_by: makerId,
    });

    return successResponse(res, {
      status: true,
      message: "Admin User Request Created Successfully",
      data: { id: result.id },
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Admin User Request Creation Failed: " + error.message,
      data: {},
      statusCode: 401,
    });
  }
};

const getPendingAdminUserRequests = async (req, res) => {
  try {
    const result = await getPendingAdminUsers();
    return successResponse(res, {
      status: true,
      message: "Admin User Request Found Successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Admin User Request Not Found: " + error.message,
      data: {},
      statusCode: 401,
    });
  }
};

module.exports = { createAdminUserRequest, getPendingAdminUserRequests };
