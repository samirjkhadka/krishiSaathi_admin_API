const { createExpenseService } = require("../../services/expenses/expenses.service");
const { errorResponse, successResponse } = require("../../utils/responseFormatter");

const createExpense = async (req, res) => {
  if (!req.body) {
    return errorResponse(res, {
      status: false,
      message: "Invalid Request",
      data: {},
      statusCode: 400,
    });
  }

  const { title, amount, category, userId } = req.body;
  if (!title || !amount || !category || !userId) {
    return errorResponse(res, {
      status: false,
      message: "All Fields are required",
      data: {},
      statusCode: 400,
    });
  }

  try {
    const result = await createExpenseService(req.body, req.user.id);

    return successResponse(res, {
      status: true,
      message: "Expense Created Successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Expense Creation Failed: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

module.exports = { createExpense };
