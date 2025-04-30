const express = require("express");

const authenticateJWT = require("../middlewares/auth.middleware");
const {
  createAdminUserRequest,
  getPendingAdminUserRequests,
} = require("../controllers/adminUser.controller");
const router = express.Router();

router.post("/create-user", authenticateJWT, createAdminUserRequest);
router.post("/get-pending-users", authenticateJWT, getPendingAdminUserRequests);

module.exports = router;
