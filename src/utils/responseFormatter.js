const successResponse = (res, { status, message, data = {}, statusCode }) => {
  return res.status(statusCode).json({ status, statusCode, message, data });
};

const failResponse = (res, { status, message, data = {}, statusCode }) => {
  return res.status(statusCode).json({ status, statusCode, message, data });
};

const errorResponse = (res, { status, message, data = {}, statusCode }) => {
  return res.status(statusCode).json({ status, statusCode, message, data });
};

module.exports = { successResponse, failResponse, errorResponse };
