const db = require('../config/db');

exports.findAll = async (filters) => {
  let sql = "SELECT * FROM Expenses WHERE 1=1";
  const params = [];

  if (filters.category) {
    sql += " AND Category = ?";
    params.push(filters.category);
  }

  if (filters.date) {
    sql += " AND Date = ?";
    params.push(filters.date);
  }

  const [rows] = await db.execute(sql, params);
  return rows;
};

exports.create = async (expense) => {
  const { Category, Amount, Date, Description } = expense;
  console.log("Creating expense:", expense);
  console.log("Expense details:", Category, Amount, Date, Description);
  const sql = "INSERT INTO Expenses (Category, Amount, Date, Description) VALUES (?, ?, ?, ?)";
  const [result] = await db.execute(sql, [Category, Amount, Date, Description]);
  return { id: result.insertId, ...expense };
};

exports.update = async (id, expense) => {
  const { Category, Amount, Date, Description } = expense;
  // console.log("Updating expense:", id, expense);

  const sql = "UPDATE Expenses SET Category = ?, Amount = ?, Date = ?, Description = ? WHERE ExpenseID = ?";
  await db.execute(sql, [Category, Amount, Date, Description, id]);
  return { id, ...expense };
};

exports.remove = async (id) => {
  await db.execute("DELETE FROM Expenses WHERE ExpenseID = ?", [id]);
  return { message: "Expense deleted", id };
};
