const { errorResponse } = require("../utils/responseFormatter");

const errorHandler = (err, req, res, next) => {
  console.error("Error: ", err.stack);

  return errorResponse(res, {
    status: false,
    message: "Internal Server Error: " + err.errors,
    data: {},
    statusCode: 500,
  });
};

module.exports = errorHandler;
