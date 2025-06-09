const Expense = require('../models/expenseModel');

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll(req.query);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const result = await Expense.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const result = await Expense.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const result = await Expense.remove(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
