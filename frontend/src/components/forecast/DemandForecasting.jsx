import React from 'react';
import { useTenant } from '../../context/TenantContext';

export const DemandForecasting = () => {
  const { activeData } = useTenant();
  const forecast = activeData.forecast || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100 mb-4">30-Day Demand Forecasting</h2>
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-zinc-800/60 text-slate-500 dark:text-zinc-400">
            <tr>
              <th className="p-4">SKU</th>
              <th className="p-4">Name</th>
              <th className="p-4">Current Stock</th>
              <th className="p-4">30-Day Forecast</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-zinc-300">
            {forecast.map(item => (
              <tr key={item.sku_code}>
                <td className="p-4 font-mono text-xs">{item.sku_code}</td>
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">{item.current_stock}</td>
                <td className="p-4 font-semibold text-indigo-600">{item.forecast_units} units</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};