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

const getAllPendingAdminUsers = async (req, res ) => {

  try {

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || "";

    console.log(page, limit, search);
    const result = await getPendingAdminUsers({
      page, limit, search
    });

    return successResponse(res, {
      status: true,
      message: "Pending admin users fetched successfully",
      data: {
        users: result.users,
        totalCount: result.totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
      },
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Error fetching pending admin users: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

module.exports = { createAdminUserRequest, getAllPendingAdminUsers };
