const express = require("express");
const router = express.Router();

const authenticateJWT = require("../middlewares/auth.middleware");

const {
  insertPermissions,
  getAllPermissions,
} = require("../controllers/rbac/permissions.controller");

// Permissions
router.post("/createPermissions", authenticateJWT, insertPermissions);
router.post("/getAllPermissions", authenticateJWT, getAllPermissions);

module.exports = router;
