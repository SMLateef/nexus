// frontend/src/components/layout/TabNav.jsx
import React from 'react';

export const TabNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'inventory', label: 'Inventory Registry' },
    { id: 'pos', label: 'POS Terminal' },
    { id: 'forecast', label: 'Demand Forecast' },
    { id: 'procurement', label: 'Restock & POs' },
  ];

  return (
    <div className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-4 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};