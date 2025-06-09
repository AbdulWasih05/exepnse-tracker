import React from 'react';

function ExpenseList({ expenses, onEdit, onDelete }) {
  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      // For ISO strings (2025-06-11T18:30:00.000Z)
      if (dateString.includes('T')) {
        return dateString.split('T')[0];
      }
      // For already formatted dates (2025-06-11)
      return dateString;
    } catch {
      return dateString; // Fallback to original if parsing fails
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-deepViolet text-white">
        <thead>
          <tr className="bg-electricPurple text-left">
            <th className="p-2">Category</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Date</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.ExpenseID} className="hover:bg-lavender transition">
              <td className="p-2">{expense.Category}</td>
              <td className="p-2">{expense.Amount}</td>
              <td className="p-2">{formatDate(expense.Date)}</td>
              <td className="p-2">{expense.Description}</td>
              <td className="p-2">
                <div className="flex space-x-2 justify-evenly">
                  <button className="text-neonCyan   p-1"  onClick={() => onEdit(expense)}>Edit</button>
                  <button className="text-neonMagenta  hover:text-white " onClick={() => onDelete(expense.ExpenseID)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;