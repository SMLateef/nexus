import React from 'react';

export const AddSkuModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-md border border-slate-200 dark:border-zinc-800 shadow-xl">
        <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mb-4">Add New SKU</h3>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">Form logic will be connected to the API layer shortly.</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-lg text-sm font-medium">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium">Save SKU</button>
        </div>
      </div>
    </div>
  );
};