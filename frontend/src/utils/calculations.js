// frontend/src/utils/calculations.js

/**
 * Calculates POS cart totals enforcing exact business requirements:
 * Subtotal = Sum(Price * Qty)
 * Discount = Subtotal * (Discount% / 100)
 * Tax = (Subtotal - Discount) * 0.08
 * Total = Subtotal - Discount + Tax
 */
export function calculateCartTotals(cartItems, discountPercent = 0, taxRate = 0.08) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxableAmount * taxRate;
  const total = Math.max(0, taxableAmount + taxAmount);

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discountAmount: Number(discountAmount.toFixed(2)),
    taxAmount: Number(taxAmount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

/**
 * Evaluates if a stock item has fallen to or below its reorder point.
 */
export function isLowStock(stockQuantity, reorderPoint) {
  return Number(stockQuantity) <= Number(reorderPoint);
}