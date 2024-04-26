const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenses");
const authController = require("../middlewares/auth");

router.post(
  "/addExpense",
  authController.authenticate,
  expenseController.addExpense
);

router.get(
  "/getExpenses",
  authController.authenticate,
  expenseController.getExpenses
);

router.put(
  "/editExpense",
  authController.authenticate,
  expenseController.editExpense
);

router.delete("/deleteExpense/:id", expenseController.deleteExpense);

module.exports = router;
