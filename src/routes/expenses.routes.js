const express = require("express");
const router = express.Router();

const authenticateJWT = require("../middlewares/auth.middleware");
const {
  createExpense,
} = require("../controllers/expenses/expenses.controller");

router.post("/createTransaction", authenticateJWT, createExpense);


module.exports = router;
