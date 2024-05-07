const Expenses = require("../models/expense");

exports.addExpense = async (req, res) => {
  try {
    const { expId, amt, desc, category } = req.body;
    const data = await Expenses.create({
      id: expId,
      amount: amt,
      description: desc,
      category,
      userId: req.user.id,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const data = await Expenses.findAll({ where: { userId: req.user.id } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    await Expenses.destroy({ where: { id: id } });
    res.status(200).json({ id: id });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.editExpense = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json(error);
  }
};
