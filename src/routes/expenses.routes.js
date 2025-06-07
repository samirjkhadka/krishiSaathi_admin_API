const express = require("express");
const router = express.Router();

const authenticateJWT = require("../middlewares/auth.middleware");
const {
  createExpense,
  getAllExpenses,
  getExpensesById,
  getExpensesByUserId,
  deleteExpense,
  getExpensesSummary,
} = require("../controllers/expenses/expenses.controller");

router.post("/createTransaction", createExpense);
router.get("/getAllExpenses", getAllExpenses);
router.get("/getExpensesById/:id", getExpensesById);
router.get(
  "/getExpensesByUserId/:userId",

  getExpensesByUserId
);
router.delete("/deleteExpense/:id", deleteExpense);
router.get("/getExpensesSummary/:userId", getExpensesSummary);

module.exports = router;
