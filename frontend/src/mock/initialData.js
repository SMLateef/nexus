// frontend/src/mock/initialData.js

export const initialTenantsData = {
  apex_retail: {
    inventory: [
      { id: 'sku_1', sku_code: 'APX-1001', name: 'Premium Wireless Headphones', category: 'Electronics', unit_price: 149.99, stock: 45, reorder_point: 10 },
      { id: 'sku_2', sku_code: 'APX-1002', name: 'Mechanical Keyboard (Red Switches)', category: 'Electronics', unit_price: 89.99, stock: 8, reorder_point: 15 },
      { id: 'sku_3', sku_code: 'APX-1003', name: '4K Ultra HD Monitor', category: 'Electronics', unit_price: 320.00, stock: 12, reorder_point: 5 },
    ],
    forecast: [
      { sku_code: 'APX-1001', name: 'Premium Wireless Headphones', current_stock: 45, forecast_units: 30 },
      { sku_code: 'APX-1002', name: 'Mechanical Keyboard (Red Switches)', current_stock: 8, forecast_units: 25 },
      { sku_code: 'APX-1003', name: '4K Ultra HD Monitor', current_stock: 12, forecast_units: 10 },
    ]
  },
  global_pharma: {
    inventory: [
      { id: 'sku_4', sku_code: 'GLB-2001', name: 'Amoxicillin 500mg', category: 'Antibiotics', unit_price: 12.50, stock: 120, reorder_point: 50 },
      { id: 'sku_5', sku_code: 'GLB-2002', name: 'Ibuprofen 200mg (Pack of 50)', category: 'Pain Relief', unit_price: 8.99, stock: 35, reorder_point: 40 },
    ],
    forecast: [
      { sku_code: 'GLB-2001', name: 'Amoxicillin 500mg', current_stock: 120, forecast_units: 150 },
      { sku_code: 'GLB-2002', name: 'Ibuprofen 200mg', current_stock: 35, forecast_units: 80 },
    ]
  }
};