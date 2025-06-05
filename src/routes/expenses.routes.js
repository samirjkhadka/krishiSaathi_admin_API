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

router.post("/createTransaction", authenticateJWT, createExpense);
router.get("/getAllExpenses", authenticateJWT, getAllExpenses);
router.get("/getExpensesById/:id", authenticateJWT, getExpensesById);
router.get(
  "/getExpensesByUserId/:userId",
  authenticateJWT,
  getExpensesByUserId
);
router.delete("/deleteExpense/:id", authenticateJWT, deleteExpense);
router.get("/getExpensesSummary/:userId", authenticateJWT, getExpensesSummary);

module.exports = router;
