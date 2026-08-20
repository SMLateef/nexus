import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

export const InventoryRegistry = ({ onOpenAddModal }) => {
  const { activeData } = useTenant();
  const [search, setSearch] = useState('');
  
  const inventory = activeData.inventory || [];
  const filtered = inventory.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.sku_code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <input 
          type="text" 
          placeholder="Search SKU or Name..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          onClick={onOpenAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Add New SKU
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-zinc-800/60 border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400">
            <tr>
              <th className="p-4">SKU</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {filtered.map(item => (
              <tr key={item.id} className="text-slate-700 dark:text-zinc-300">
                <td className="p-4 font-mono text-xs">{item.sku_code}</td>
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 text-xs">{item.category}</td>
                <td className="p-4">${item.unit_price.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${item.stock <= item.reorder_point ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                    {item.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};