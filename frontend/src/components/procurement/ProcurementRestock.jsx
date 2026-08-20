import React from 'react';
import { useTenant } from '../../context/TenantContext';

export const ProcurementRestock = () => {
  const { activeData } = useTenant();
  const inventory = activeData.inventory || [];
  const shortages = inventory.filter(item => item.stock <= item.reorder_point);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100 mb-4">Automated Restock & POs</h2>
      {shortages.length === 0 ? (
        <div className="p-6 text-center text-slate-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800">
          No active shortages detected. Stock levels are healthy.
        </div>
      ) : (
        <div className="space-y-4">
          {shortages.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-rose-200 dark:border-rose-900/50 rounded-xl shadow-sm">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-zinc-100">{item.name}</h4>
                <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">Critical Stock: {item.stock} / Reorder Point: {item.reorder_point}</p>
              </div>
              <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-semibold rounded-lg transition">
                Generate PO
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};