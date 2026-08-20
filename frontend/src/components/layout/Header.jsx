// frontend/src/components/layout/Header.jsx
import React from 'react';
import { useTenant } from '../../context/TenantContext';
import { useTheme } from '../../context/ThemeContext';
import { exportToCsv } from '../../utils/csvExport';

export const Header = ({ onOpenAddSkuModal }) => {
  const { tenants, activeTenantId, setActiveTenantId, activeData } = useTenant();
  const { theme, toggleTheme } = useTheme();

  const handleExport = () => {
    exportToCsv(`nexus_inventory_${activeTenantId}.csv`, activeData.inventory);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-b border-slate-200 dark:border-zinc-800 px-6 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            N
          </div>
          <div>
            <h1 className="text-base font-semibold text-slate-900 dark:text-zinc-100 tracking-tight leading-none">
              Nexus Management
            </h1>
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              Enterprise Supply Chain & POS
            </span>
          </div>
        </div>

        {/* Tenant Switcher & Global Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg border border-slate-200 dark:border-zinc-700">
            <span className="text-xs font-medium text-slate-500 dark:text-zinc-400 pl-2">Tenant:</span>
            <select
              value={activeTenantId}
              onChange={(e) => setActiveTenantId(e.target.value)}
              className="bg-white dark:bg-zinc-900 text-xs font-semibold text-slate-800 dark:text-zinc-200 rounded-md px-2.5 py-1 border-none shadow-sm cursor-pointer focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {tenants.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleExport}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-medium text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 transition cursor-pointer"
          >
            Export CSV
          </button>

          <button
            onClick={onOpenAddSkuModal}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-sm transition cursor-pointer"
          >
            + New SKU
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};