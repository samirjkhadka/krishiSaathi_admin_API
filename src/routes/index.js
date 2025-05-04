const express = require("express");
const router = express.Router();

const authRoutes = require("../routes/auth.routes");
const adminUserRoutes = require("../routes/adminUser.routes");
const roleRoutes = require("./roles.routes");
const permissionRoutes = require("./permissions.routes");
const rbacRoutes = require("./rbac.routes");

router.use("/auth", authRoutes);
router.use("/admin", adminUserRoutes);

router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/rbac", rbacRoutes);

module.exports = router;
