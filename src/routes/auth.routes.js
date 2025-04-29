const express = require("express");
const {
  loginUser,
  logoutUser,
  forgotPasswordHandler,

  setup2FAToken,
  verify2FA,
} = require("../controllers/auth.controller");
const authenticateJWT = require("../middlewares/auth.middleware");
const router = express.Router();

//public routes
router.post("/login", loginUser);
router.post("/forgot-password", forgotPasswordHandler);

//authenticated routes
router.post("/2fa/setup", authenticateJWT, setup2FAToken);
router.post("/2fa/verify", authenticateJWT, verify2FA);
router.post("/logout", authenticateJWT, logoutUser);

module.exports = router;
