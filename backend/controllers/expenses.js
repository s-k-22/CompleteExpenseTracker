const Expenses = require("../models/expense");

exports.addExpense = async (req, res) => {
  const { expId, amt, desc, category } = req.body;
  const data = await Expenses.create({
    id: expId,
    amount: amt,
    description: desc,
    category,
    userId: req.user.id,
  });
  res.status(201).json(data);
};

exports.getExpenses = async (req, res) => {
  const data = await Expenses.findAll();
  res.status(200).json(data);
};

exports.deleteExpense = async (req, res) => {
  const id = req.params.id;
  await Expenses.destroy({ where: { id: id } });
  res.status(200).json({ msg: "expense deleted successfully" });
};

exports.editExpense = async (req, res) => {
  console.log(req.body);
  const { expId, amt, desc, category } = req.body;
  const expense = await Expenses.findOne({ where: { id: expId } });
  const data = await expense.update({
    id: expId,
    amount: amt,
    description: desc,
    category,
    userId: req.user.id,
  });
  res.status(201).json(data);
};
