import React, { useState, useEffect } from 'react';
import ExpenseList from './components/ExpenseList';
import AddEditModal from './components/AddEditModal';
import FilterBar from './components/FilterBar';
import DeleteConfirm from './components/DeleteConfirm';
import { getExpenses, createExpense, updateExpense, deleteExpense } from './api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: '', date: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchExpenses = async () => {
  try {
    const response = await getExpenses(filters);
    setExpenses(response.data); // Make sure this updates state
  } catch (error) {
    console.error("Failed to fetch expenses", error);
  }
};


  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const handleAdd = () => {
    setEditingExpense(null);
    setModalOpen(true);
  };

  const handleSubmit = async (expense) => {
    if (editingExpense) {
      await updateExpense(editingExpense.ExpenseID, expense);
    } else {
      await createExpense(expense);
    }
    fetchExpenses();
  };

  const handleDelete = async () => {
    await deleteExpense(deleteId);
    setDeleteId(null);
    fetchExpenses();
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-4xl mb-4 text-electricPurple font-sans">Expense Tracker</h1>
      <FilterBar filters={filters} onChange={handleFilterChange} />
      <button className="mb-4 px-4 py-2 border border-neonCyan" onClick={handleAdd}>
        + Add Expense
      </button>
      <ExpenseList expenses={expenses} onEdit={(e) => { setEditingExpense(e); setModalOpen(true); }} onDelete={setDeleteId} />
      <AddEditModal visible={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} expense={editingExpense} />
      <DeleteConfirm visible={!!deleteId} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
    </div>
  );
}

export default App;
