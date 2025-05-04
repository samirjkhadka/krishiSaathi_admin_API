const express = require("express");
const router = express.Router();

const RoleController = require("../controllers/rbac/role.controller");
const authenticateJWT = require("../middlewares/auth.middleware");

const RolePermissionController = require("../controllers/rbac/rolePermission.controller");
const { insertPermissions, getAllPermissions } = require("../controllers/rbac/permissions.controller");

router.post("/create", authenticateJWT, RoleController.createRole);
router.post("/getAllRoles", authenticateJWT, RoleController.findAllRoles);
router.post("/:id", authenticateJWT, RoleController.getRoleById);
router.post("/updateRole/:id", authenticateJWT, RoleController.updateRole);

// Permissions
router.post("/createPermissions", authenticateJWT, insertPermissions);
router.post("/getAllPermissions", authenticateJWT, getAllPermissions);
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
