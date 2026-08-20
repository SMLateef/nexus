import React from 'react';

export const ReceiptModal = ({ receipt, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-sm w-full p-6 border border-slate-200 dark:border-zinc-800">
        <div id="thermal-receipt" className="font-mono text-xs text-slate-800 dark:text-zinc-200 space-y-3">
          <div className="text-center pb-3 border-b border-dashed border-slate-300 dark:border-zinc-700">
            <h3 className="font-bold text-sm uppercase">Nexus Register Sale</h3>
            <p className="text-[10px] text-slate-500">{receipt.receiptId}</p>
          </div>
          <div className="space-y-1 py-1">
            {receipt.items.map(item => (
              <div key={item.id} className="flex justify-between text-[11px]">
                <span className="truncate pr-2">{item.name} x{item.quantity}</span>
                <span>${(item.unit_price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-dashed border-slate-300 dark:border-zinc-700 flex justify-between font-bold text-sm">
            <span>Total Paid:</span>
            <span>${receipt.total.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={() => window.print()} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold">Print</button>
          <button onClick={onClose} className="py-2 px-3 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-lg text-xs font-semibold">Close</button>
        </div>
      </div>
    </div>
  );
};