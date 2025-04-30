const express = require("express");
const router = express.Router();

const authRoutes = require("../routes/auth.routes");
const adminUserRoutes = require("../routes/adminUser.routes");

router.use("/auth", authRoutes);
router.use("/admin", adminUserRoutes);

module.exports = router;
