const {
  createPendingAdminUser,
  getPendingAdminUsers,
  approvePendingAdminUser,
  rejectPendingAdminUser,
  editAndResubmitPendingUser,
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

const getAllPendingAdminUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || "";

    console.log(page, limit, search);
    const result = await getPendingAdminUsers({
      page,
      limit,
      search,
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

const approveAdminUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await approvePendingAdminUser(id, req.user.id);
    return successResponse(res, {
      status: true,
      message: "Approval Success",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Approval Failed: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

const rejectAdminUser = async (req, res) => {
  const { id } = req.params;
  const { remarks } = req.body;
  try {
    const result = await rejectPendingAdminUser(id, req.user.id, remarks);
    return successResponse(res, {
      status: true,
      message: "Rejection Success",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Rejection Failed: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

const handleEditResubmitPendingUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await editAndResubmitPendingUser(id, req.body);
    return successResponse(res, {
      status: true,
      message: "Update Success",
      data: updatedUser,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Update Failed: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

module.exports = {
  createAdminUserRequest,
  getAllPendingAdminUsers,
  approveAdminUser,
  rejectAdminUser,
  handleEditResubmitPendingUser,
};
