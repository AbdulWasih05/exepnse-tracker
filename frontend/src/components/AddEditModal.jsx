import React, { useState, useEffect } from 'react';

function AddEditModal({ visible, onClose, onSubmit, expense }) {
  const [formData, setFormData] = useState({
    Category: '',
    Amount: '',
    Date: '',
    Description: ''
  });

  useEffect(() => {
    if (expense) {
      // Convert date to YYYY-MM-DD format for the input
      const formattedDate = expense.Date 
        ? new Date(expense.Date).toISOString().split('T')[0]
        : '';
      
      setFormData({
        ...expense,
        Date: formattedDate
      });
    } else {
      // Reset form with current date as default
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        Category: '',
        Amount: '',
        Date: today,
        Description: ''
      });
    }
  }, [expense, visible]); // Added visible to dependencies

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Amount' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior
    
    // Prepare data for submission
    const submissionData = {
      ...formData,
      // Don't convert to ISO string here - let the API handle it
      // Or convert only if your backend requires it
    };
    
    onSubmit(submissionData);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-neonCyan text-white w-full max-w-md">
        <h2 className="text-xl mb-4">{expense ? 'Edit Expense' : 'Add Expense'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm mb-1">Category *</label>
            <input
              type="text"
              name="Category"
              value={formData.Category}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-deepViolet text-white border border-electricPurple"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm mb-1">Amount *</label>
            <input
              type="number"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              required
              min="0"
              step="1.00"
              className="w-full p-2 rounded bg-deepViolet text-white border border-electricPurple"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm mb-1">Date *</label>
            <input
              type="date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-deepViolet text-white border border-electricPurple"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm mb-1">Description</label>
            <input
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-deepViolet text-white border border-electricPurple"
            />
          </div>

          <div className="flex justify-end">
            <button 
              type="button"
              className="px-4 py-1 border border-neonMagenta mr-2" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-1 border border-neonCyan"
            >
              {expense ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditModal;