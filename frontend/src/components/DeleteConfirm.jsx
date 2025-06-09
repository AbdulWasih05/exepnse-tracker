import React from 'react';

function DeleteConfirm({ visible, onConfirm, onCancel }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-lg border border-neonMagenta text-white text-center">
        <p>Are you sure you want to delete this expense?</p>
        <div className="mt-4">
          <button className="mr-2 border border-neonCyan px-4 py-1" onClick={onConfirm}>Yes</button>
          <button className="border border-neonMagenta px-4 py-1" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
