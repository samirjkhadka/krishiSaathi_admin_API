const express = require("express");

const authenticateJWT = require("../middlewares/auth.middleware");
const {
  createAdminUserRequest,

  getAllPendingAdminUsers,
  approveAdminUser,
  rejectAdminUser,
  handleEditResubmitPendingUser,
} = require("../controllers/adminUser.controller");
const router = express.Router();

router.post("/create-user", authenticateJWT, createAdminUserRequest);
router.get("/get-pending-users", authenticateJWT, getAllPendingAdminUsers);
router.patch("/approve-user/:id", authenticateJWT, approveAdminUser);
router.patch("/reject-user/:id", authenticateJWT, rejectAdminUser);
router.put(
  "/edit-resubmit/:id",
  authenticateJWT,
  handleEditResubmitPendingUser
);

module.exports = router;
