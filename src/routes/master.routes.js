const express = require("express");
const router = express.Router();
const { getMasters } = require("../controllers/master.controller");

// Public route for dropdowns
router.get("/:type", getMasters);

module.exports = router;
