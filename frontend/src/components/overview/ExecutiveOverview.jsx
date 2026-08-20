import React from 'react';
import { useTenant } from '../../context/TenantContext';

export const ExecutiveOverview = () => {
  const { activeData } = useTenant();
  const inventory = activeData.inventory || [];
  const forecast = activeData.forecast || [];

  const totalValuation = inventory.reduce((sum, item) => sum + (item.unit_price * item.stock), 0);
  const totalProjected = forecast.reduce((sum, item) => sum + (item.forecast_units * 10), 0); // Simplified multiplier
  const lowStockCount = inventory.filter(i => i.stock <= i.reorder_point).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">Executive Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Current Stock Valuation</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mt-2">${totalValuation.toFixed(2)}</p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">30-Day Projected Demand</p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">${totalProjected.toFixed(2)}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-rose-200 dark:border-rose-900/50 shadow-sm">
          <p className="text-xs text-rose-500 dark:text-rose-400 font-medium">Shortage Alerts</p>
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-500 mt-2">{lowStockCount} SKUs</p>
        </div>
      </div>
    </div>
  );
};