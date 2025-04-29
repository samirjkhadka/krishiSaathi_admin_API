const {
  login,
  generate2FASecret,
  forgotPassword,
  verify2FAToken
} = require("../services/auth.services");
const {
  failResponse,
  errorResponse,
  successResponse,
} = require("../utils/responseFormatter");

const loginUser = async (req, res) => {
  if (!req.body) {
    return failResponse(res, {
      status: false,
      message: "Invalid Request",
      data: {},
      statusCode: 400,
    });
  }

  if (!req.body.username || !req.body.password) {
    return failResponse(res, {
      status: false,
      message: "Username and Password is required",
      data: {},
      statusCode: 400,
    });
  }
  try {

    const { username, password } = req.body;

    const { token, user } = await login(username, password);

    console.log(token, user);


    if (!user) {
      return failResponse(res, {
        status: false,
        message: "User not found",
        data: {},
        statusCode: 404,
      });
    }

    return   successResponse(res, {
      status: true,
      message: "Login Success",
      data: { token, user },
      statusCode: 200,
    });
  } catch (error) {
    return   errorResponse(res, {
      status: false,
      message: "Login Failed: " + error,
      data: {},
      statusCode: 401,
    });
  }
};

const setup2FAToken = async (req, res) => {
  if (!req.body) {
   return failResponse(res, {
      status: false,
      message: "Invalid Request",
      data: {},
      statusCode: 400,
    });
  }

  if (!req.body.userId) {
    return  failResponse(res, {
      status: false,
      message: "User Id is required",
      data: {},
      statusCode: 400,
    });
  }

  try {
    const { userId } = req.body;
    const secret = await generate2FASecret(userId);

    return successResponse(res, {
      status: true,
      message: "2FA Setup Success",
      data: secret,
      statusCode: 200,
    });
  } catch (error) {
    return   errorResponse(res, {
      status: false,
      message: "2FA setup Failed: " + error.message,
      data: {},
      statusCode: 401,
    });
  }
};

const verify2FA = async (req, res) => {
  if (!req.body) {
    return failResponse(res, {
      status: false,
      message: "Invalid Request",
      data: {},
      statusCode: 400,
    });
  }

  if (!req.body.userId || !req.body.token) {
    return failResponse(res, {
      status: false,
      message: "User Id and Token is required",
      data: {},
      statusCode: 400,
    });
  }

  try {
    const { userId, token } = req.body;
    const verified = await verify2FAToken(userId, token);

    if (!verified) {
      return failResponse(res, {
        status: false,
        message: "Invalid Token",
        data: {},
        statusCode: 401,
      });
    }

    successResponse(res, {
      status: true,
      message: "2FA Verify Success",
      data: {},
      statusCode: 200,
    });
  } catch (error) {
    errorResponse(res, {
      status: false,
      message: "2FA Verify Failed: " + error.message,
      data: {},
      statusCode: 401,
    });
  }
};

const forgotPasswordHandler = async (req, res) => {
  if (!req.body) {
    return failResponse(res, {
      status: false,
      message: "Invalid Request",
      data: {},
      statusCode: 400,
    });
  }

  if (!req.body.username) {
    return failResponse(res, {
      status: false,
      message: "Username is required",
      data: {},
      statusCode: 400,
    });
  }

  try {
    const { username } = req.body;
    await forgotPassword(username);
    successResponse(res, {
      status: true,
      message: "Forgot Password Success",
      data: {},
      statusCode: 200,
    });
  } catch (error) {
    errorResponse(res, {
      status: false,
      message: "Forgot Password Failed: " + error.message,
      data: {},
      statusCode: 401,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    successResponse(res, {
      status: true,
      message: "Logout Success",
      data: {},
      statusCode: 200,
    });
  } catch (error) {
    errorResponse(res, {
      status: false,
      message: "Logout Failed: " + error.message,
      data: {},
      statusCode: 401,
    });
  }
};

module.exports = {
  loginUser,
  setup2FAToken,
  verify2FA,
  forgotPasswordHandler,
  logoutUser,
};
