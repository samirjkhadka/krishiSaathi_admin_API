const jwt = require("jsonwebtoken");
const { failResponse, errorResponse } = require("../utils/responseFormatter");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return failResponse(res, {
      status: false,
      message: "Unauthorised Access",
      data: {},
      statusCode: 401,
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, {
      status: false,
      message: "Invalid or expired token",
      data: {},
      statusCode: 401,
    });
  }
};

module.exports = authenticateJWT;
