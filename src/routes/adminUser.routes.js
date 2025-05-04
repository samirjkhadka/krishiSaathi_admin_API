const express = require("express");

const authenticateJWT = require("../middlewares/auth.middleware");
const {
  createAdminUserRequest,

  getAllPendingAdminUsers,
  approveAdminUser,
  rejectAdminUser,
  handleEditResubmitPendingUser,
  handleDeleteUser,
} = require("../controllers/adminUser.controller");
const checkPermission = require("../middlewares/permission.middleware");
const router = express.Router();

router.post(
  "/create-user",
  authenticateJWT,
  checkPermission,
  createAdminUserRequest
);
router.get(
  "/get-pending-users",
  authenticateJWT,
  checkPermission,
  getAllPendingAdminUsers
);
router.patch(
  "/approve-user/:id",
  authenticateJWT,
  checkPermission,
  approveAdminUser
);
router.patch(
  "/reject-user/:id",
  authenticateJWT,
  checkPermission,
  rejectAdminUser
);
router.put(
  "/edit-resubmit/:id",
  authenticateJWT,
  checkPermission,
  handleEditResubmitPendingUser
);
router.delete(
  "/delete-pending-user/:id",
  authenticateJWT,
  checkPermission,
  handleDeleteUser
);

module.exports = router;
