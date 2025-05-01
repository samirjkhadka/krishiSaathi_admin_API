const express = require("express");

const authenticateJWT = require("../middlewares/auth.middleware");
const {
  createAdminUserRequest,

  getAllPendingAdminUsers,
} = require("../controllers/adminUser.controller");
const router = express.Router();

router.post("/create-user", authenticateJWT, createAdminUserRequest);
router.get("/get-pending-users", authenticateJWT, getAllPendingAdminUsers);

module.exports = router;
