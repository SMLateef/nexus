import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import { calculateCartTotals } from '../../utils/calculations';
import { ReceiptModal } from './ReceiptModal';

export const PosTerminal = () => {
  const { activeData, deductInventoryFromSale } = useTenant();
  const [cart, setCart] = useState([]);
  const [lastReceipt, setLastReceipt] = useState(null);
  
  const inventory = activeData.inventory || [];
  const totals = calculateCartTotals(cart, 0, 0.08); // 0% discount, 8% tax

  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const salePayload = {
      receiptId: `REC-${Date.now().toString().slice(-6)}`,
      items: [...cart],
      ...totals
    };
    deductInventoryFromSale(cart);
    setLastReceipt(salePayload);
    setCart([]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 h-fit">
        {inventory.map(product => (
          <div key={product.id} onClick={() => addToCart(product)} className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl cursor-pointer hover:border-indigo-500 shadow-sm">
            <p className="text-xs font-mono text-slate-400">{product.sku_code}</p>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-100">{product.name}</h4>
            <p className="text-sm font-bold text-indigo-600 mt-2">${product.unit_price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-white dark:bg-zinc-900 p-6 border border-slate-200 dark:border-zinc-800 rounded-xl h-fit">
        <h3 className="font-semibold text-slate-800 dark:text-zinc-100 mb-4">Active Cart</h3>
        <div className="space-y-3 mb-6">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-sm text-slate-600 dark:text-zinc-300">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.unit_price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 text-sm">
          <div className="flex justify-between font-bold text-lg text-slate-900 dark:text-zinc-100">
            <span>Total</span>
            <span className="text-indigo-600">${totals.total.toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg disabled:opacity-50 transition">
            Complete Sale
          </button>
        </div>
      </div>
      {lastReceipt && <ReceiptModal receipt={lastReceipt} onClose={() => setLastReceipt(null)} />}
    </div>
  );
};