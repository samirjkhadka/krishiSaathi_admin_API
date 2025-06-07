const {
  createExpenseService,
  getAllExpenseService,
  getExpensesByIdService,
  getExpensesByUserIdService,
  deleteExpenseService,
  getExpensesSummaryService,
} = require("../../services/expenses/expenses.service");
const {
  errorResponse,
  successResponse,
} = require("../../utils/responseFormatter");

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
    const result = await createExpenseService(req.body, userId);

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

const getAllExpenses = async (req, res) => {
  try {
    const result = await getAllExpenseService(req.body, req.user.id);
    return successResponse(res, {
      status: true,
      message: "Expense Transaction Fetched Successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Expense Transaction Fetched Failed: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

const getExpensesById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getExpensesByIdService(id);
    return successResponse(res, {
      status: true,
      message: "Expense Transaction Fetched Successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Expense Transaction Fetched Failed: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

const getExpensesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await getExpensesByUserIdService(userId);
    return successResponse(res, {
      status: true,
      message: "Expense Transaction Fetched Successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Expense Transaction Fetched Failed: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteExpenseService(id);
    return successResponse(res, {
      status: true,
      message: "Expense Transaction Deleted Successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Expense Transaction Deletion Failed: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

const getExpensesSummary = async (req, res) => {
   const { userId } = req.params;
  try {


    const result = await getExpensesSummaryService(userId);

    return successResponse(res, {
      status: true,
      message: "Expense Summary Fetched Successfully",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Expense Summary Fetched Failed: " + error.message,
      data: {},
      statusCode: 500,
    });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpensesById,
  getExpensesByUserId,
  deleteExpense,
  getExpensesSummary,
};
