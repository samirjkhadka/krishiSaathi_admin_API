const express = require("express");
const router = express.Router();

const authenticateJWT = require("../middlewares/auth.middleware");

const RolePermissionController = require("../controllers/rbac/rolePermission.controller");

router.post(
  "/assign",
  authenticateJWT,
  RolePermissionController.assignPermissionToRole
);
router.post(
  "/remove",
  authenticateJWT,
  RolePermissionController.removePermissionsFromRole
);
router.post(
  "/:roleId",
  authenticateJWT,
  RolePermissionController.getPermissionsForRole
);

module.exports = router;
