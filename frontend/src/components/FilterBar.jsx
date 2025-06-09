import React from 'react';

function FilterBar({ filters, onChange }) {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Category"
        value={filters.category}
        onChange={(e) => onChange('category', e.target.value)}
        className="p-2 rounded bg-deepViolet text-white border border-electricPurple"
      />
      <input
        type="date"
        value={filters.date}
        onChange={(e) => onChange('date', e.target.value)}
        className="p-2 rounded bg-deepViolet text-white border border-electricPurple"
      />
    </div>
  );
}

export default FilterBar;
