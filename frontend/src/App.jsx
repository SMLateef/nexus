import React, { useState } from 'react';

function App() {
  const [tenantId, setTenantId] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false); // Theme toggle state
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState('');

  // New item modal form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemSku, setNewItemSku] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemQty, setNewItemQty] = useState('');

  // Billing / Cart state
  const [cart, setCart] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Tenant state data
  // Tenant state data (Customized for Hyderabad Prospects)
  // Tenant state data (Customized for Hyderabad Prospects)
  const [tenantData, setTenantData] = useState({
    1: {
      name: "MedPlus",
      inventory: [
        { sku: "MED-001", name: "Dolo 650mg Tablets (Strip of 15)", category: "Analgesics", price: 30.00, qty: 450, reorder_point: 100, supplier: "Micro Labs Ltd." },
        { sku: "MED-002", name: "Azithromycin 500mg Capsules", category: "Antibiotics", price: 110.50, qty: 85, reorder_point: 150, supplier: "Sun Pharma" },
        { sku: "MED-003", name: "Cough Syrup (Benadryl) 150ml", category: "Respiratory", price: 125.00, qty: 60, reorder_point: 40, supplier: "J&J India" },
        { sku: "MED-004", name: "Omron Digital BP Monitor", category: "Medical Devices", price: 1850.00, qty: 12, reorder_point: 15, supplier: "Omron Healthcare" },
        { sku: "MED-005", name: "Volini Pain Relief Spray 60g", category: "Topical", price: 140.00, qty: 120, reorder_point: 50, supplier: "Sun Pharma" }
      ],
      forecast: [
        { sku: "MED-001", name: "Dolo 650mg Tablets", category: "Analgesics", price: 30.00, predicted_demand: 1850 },
        { sku: "MED-002", name: "Azithromycin 500mg Capsules", category: "Antibiotics", price: 110.50, predicted_demand: 420 },
        { sku: "MED-003", name: "Cough Syrup (Benadryl)", category: "Respiratory", price: 125.00, predicted_demand: 380 },
        { sku: "MED-004", name: "Omron Digital BP Monitor", category: "Medical Devices", price: 1850.00, predicted_demand: 45 },
        { sku: "MED-005", name: "Volini Pain Relief Spray", category: "Topical", price: 140.00, predicted_demand: 510 }
      ]
    },
    2: {
      name: "Q-Mart",
      inventory: [
        { sku: "QMT-001", name: "Imported Hass Avocados (2 pcs)", category: "Fresh Produce", price: 350.00, qty: 25, reorder_point: 40, supplier: "Global Agro Imports" },
        { sku: "QMT-002", name: "Epigamia Almond Milk 1L", category: "Dairy Alternatives", price: 300.00, qty: 45, reorder_point: 30, supplier: "Drums Food Int." },
        { sku: "QMT-003", name: "Lindt Excellence Dark Chocolate 85%", category: "Confectionery", price: 450.00, qty: 80, reorder_point: 50, supplier: "Lindt & Sprungli" },
        { sku: "QMT-004", name: "Organic Quinoa 500g", category: "Pantry", price: 280.00, qty: 15, reorder_point: 25, supplier: "Organic Tattva" },
        { sku: "QMT-005", name: "Borges Extra Virgin Olive Oil 1L", category: "Pantry", price: 950.00, qty: 35, reorder_point: 20, supplier: "Borges India" }
      ],
      forecast: [
        { sku: "QMT-001", name: "Imported Hass Avocados", category: "Fresh Produce", price: 350.00, predicted_demand: 180 },
        { sku: "QMT-002", name: "Epigamia Almond Milk 1L", category: "Dairy Alternatives", price: 300.00, predicted_demand: 210 },
        { sku: "QMT-003", name: "Lindt Excellence Dark", category: "Confectionery", price: 450.00, predicted_demand: 340 },
        { sku: "QMT-004", name: "Organic Quinoa 500g", category: "Pantry", price: 280.00, predicted_demand: 90 },
        { sku: "QMT-005", name: "Borges Extra Virgin Olive Oil", category: "Pantry", price: 950.00, predicted_demand: 110 }
      ]
    },
    3: {
      name: "Bajaj Electronics",
      inventory: [
        { sku: "BAJ-001", name: "Sony 55-inch 4K Ultra HD Smart TV", category: "Televisions", price: 65990.00, qty: 18, reorder_point: 10, supplier: "Sony India" },
        { sku: "BAJ-002", name: "LG 1.5 Ton 5 Star Inverter Split AC", category: "Appliances", price: 45500.00, qty: 8, reorder_point: 15, supplier: "LG Electronics" },
        { sku: "BAJ-003", name: "Apple iPhone 15 (128GB)", category: "Smartphones", price: 79900.00, qty: 42, reorder_point: 20, supplier: "Apple India" },
        { sku: "BAJ-004", name: "Samsung 324L Frost Free Refrigerator", category: "Appliances", price: 32490.00, qty: 14, reorder_point: 10, supplier: "Samsung India" },
        { sku: "BAJ-005", name: "JBL Cinema SB270 Soundbar", category: "Audio", price: 12999.00, qty: 25, reorder_point: 15, supplier: "Harman International" }
      ],
      forecast: [
        { sku: "BAJ-001", name: "Sony 55-inch 4K TV", category: "Televisions", price: 65990.00, predicted_demand: 45 },
        { sku: "BAJ-002", name: "LG 1.5 Ton Inverter AC", category: "Appliances", price: 45500.00, predicted_demand: 85 },
        { sku: "BAJ-003", name: "Apple iPhone 15", category: "Smartphones", price: 79900.00, predicted_demand: 150 },
        { sku: "BAJ-004", name: "Samsung 324L Refrigerator", category: "Appliances", price: 32490.00, predicted_demand: 35 },
        { sku: "BAJ-005", name: "JBL Cinema Soundbar", category: "Audio", price: 12999.00, predicted_demand: 60 }
      ]
    }
  });
  // --- NEW: Live FastAPI Backend Connection ---
  React.useEffect(() => {
    let isMounted = true;
    
    async function fetchLiveMetrics() {
      try {
        // Parallel fetching for performance
        const [analyticsRes, forecastRes] = await Promise.all([
          fetch(`http://localhost:8000/analytics/${tenantId}`).catch(() => null),
          fetch(`http://localhost:8000/forecast/${tenantId}`).catch(() => null)
        ]);

        const analytics = analyticsRes?.ok ? await analyticsRes.json() : null;
        const forecast = forecastRes?.ok ? await forecastRes.json() : null;

        if (isMounted && (analytics || forecast)) {
          setTenantData(prev => ({
            ...prev,
            [tenantId]: {
              ...prev[tenantId],
              ...(analytics && { inventory: analytics.inventory }),
              ...(forecast && { forecast: forecast.data })
            }
          }));
          triggerNotification(`Live database connected for Tenant ${tenantId}`);
        }
      } catch (error) {
        console.warn("Backend offline. Using local prototype data.");
      }
    }
    
    return () => { isMounted = false; };
  }, [tenantId]);
  // --------------------------------------------// --- NEW: Live FastAPI Backend Connection ---
  React.useEffect(() => {
    let isMounted = true;
    
    async function fetchLiveMetrics() {
      try {
        // Parallel fetching for performance
        const [analyticsRes, forecastRes] = await Promise.all([
          fetch(`http://localhost:8000/analytics/${tenantId}`).catch(() => null),
          fetch(`http://localhost:8000/forecast/${tenantId}`).catch(() => null)
        ]);

        const analytics = analyticsRes?.ok ? await analyticsRes.json() : null;
        const forecast = forecastRes?.ok ? await forecastRes.json() : null;

        if (isMounted && (analytics || forecast)) {
          setTenantData(prev => ({
            ...prev,
            [tenantId]: {
              ...prev[tenantId],
              ...(analytics && { inventory: analytics.inventory }),
              ...(forecast && { forecast: forecast.data })
            }
          }));
          triggerNotification(`Live database connected for Tenant ${tenantId}`);
        }
      } catch (error) {
        console.warn("Backend offline. Using local prototype data.");
      }
    }

    // Temporarily disabled so we can see the hardcoded MedPlus demo data!
    fetchLiveMetrics();  // <-- Remove the // slashes!
    
    return () => { isMounted = false; };
  }, [tenantId]);
  // --------------------------------------------

  const current = tenantData[tenantId];

  // Calculated Metrics
  const totalValuation = current.inventory.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2);
  const totalProjectedRevenue = current.forecast.reduce((sum, item) => sum + (item.price * (item.predicted_demand || 100)), 0).toFixed(2);
  const lowStockItems = current.inventory.filter(i => i.qty <= i.reorder_point);

  // Filtered inventory items based on search query
  const filteredInventory = current.inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Add Item Handler
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemSku) return;

    const priceNum = Number(newItemPrice) || 10.00;
    const qtyNum = Number(newItemQty) || 50;

    const newItem = {
      sku: newItemSku,
      name: newItemName,
      category: newItemCategory || "General",
      price: priceNum,
      qty: qtyNum,
      reorder_point: 15,
      supplier: "Direct Supplier"
    };

    const newForecastItem = {
      sku: newItemSku,
      name: newItemName,
      category: newItemCategory || "General",
      price: priceNum,
      predicted_demand: Math.floor(Math.random() * 400) + 100
    };

    setTenantData(prev => {
      const tenantCopy = { ...prev[tenantId] };
      tenantCopy.inventory = [newItem, ...tenantCopy.inventory];
      tenantCopy.forecast = [newForecastItem, ...tenantCopy.forecast];
      return { ...prev, [tenantId]: tenantCopy };
    });

    setNewItemName('');
    setNewItemSku('');
    setNewItemCategory('');
    setNewItemPrice('');
    setNewItemQty('');
    setIsModalOpen(false);
    triggerNotification("New inventory SKU successfully registered.");
  };

  // Cart Management
  const addToCart = (item) => {
    if (item.qty <= 0) return;
    setCart(prev => {
      const existing = prev.find(i => i.sku === item.sku);
      if (existing) {
        if (existing.cartQty >= item.qty) {
          triggerNotification(`Cannot exceed available stock limit (${item.qty} units).`);
          return prev;
        }
        return prev.map(i => i.sku === item.sku ? { ...i, cartQty: i.cartQty + 1 } : i);
      }
      return [...prev, { ...item, cartQty: 1 }];
    });
  };

  const updateCartQuantity = (sku, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.sku === sku) {
          const invItem = current.inventory.find(i => i.sku === sku);
          const newQty = item.cartQty + delta;
          if (newQty <= 0) return null;
          if (invItem && newQty > invItem.qty) {
            triggerNotification(`Only ${invItem.qty} units available in stock.`);
            return item;
          }
          return { ...item, cartQty: newQty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (sku) => {
    setCart(prev => prev.filter(i => i.sku !== sku));
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.cartQty), 0);
  };

  const calculateDiscountAmount = () => {
    return (calculateSubtotal() * (discountPercent / 100));
  };

  const calculateTax = () => {
    return (calculateSubtotal() - calculateDiscountAmount()) * 0.08;
  };

  const calculateTotal = () => {
    const sub = calculateSubtotal();
    const disc = calculateDiscountAmount();
    const tax = calculateTax();
    return Math.max(0, sub - disc + tax).toFixed(2);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const orderDetails = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString(),
      tenantName: current.name,
      items: [...cart],
      subtotal: calculateSubtotal().toFixed(2),
      discount: calculateDiscountAmount().toFixed(2),
      tax: calculateTax().toFixed(2),
      total: calculateTotal()
    };

    setTenantData(prev => {
      const tenantCopy = { ...prev[tenantId] };
      tenantCopy.inventory = tenantCopy.inventory.map(invItem => {
        const cartItem = cart.find(c => c.sku === invItem.sku);
        if (cartItem) {
          return { ...invItem, qty: Math.max(0, invItem.qty - cartItem.cartQty) };
        }
        return invItem;
      });
      return { ...prev, [tenantId]: tenantCopy };
    });

    setLastCompletedOrder(orderDetails);
    setCart([]);
    setDiscountPercent(0);
    setIsReceiptModalOpen(true);
    triggerNotification("Transaction completed. Inventory updated successfully.");
  };

  const exportCSV = () => {
    const headers = "SKU,Product Name,Category,Price,Quantity,Reorder Point,Supplier\n";
    const rows = current.inventory.map(i => `${i.sku},"${i.name}",${i.category},${i.price},${i.qty},${i.reorder_point},"${i.supplier}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${current.name.replace(/\s+/g, '_')}_Inventory_Report.csv`);
    a.click();
    triggerNotification("Inventory report exported successfully.");
  };

  return (
    <div className={`min-h-screen font-sans antialiased pb-16 transition-colors duration-200 ${darkMode ? 'bg-zinc-950 text-zinc-100 selection:bg-indigo-600 selection:text-white' : 'bg-slate-50 text-slate-800 selection:bg-indigo-600 selection:text-white'}`}>
      {/* Toast Notification Banner */}
      {notification && (
        <div className={`fixed top-5 right-5 z-50 border text-xs tracking-wide px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-fade-in ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-slate-900 border-slate-700 text-slate-100'}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          {notification}
        </div>
      )}

      {/* Header */}
      <header className={`border-b backdrop-blur-md sticky top-0 z-40 px-8 py-4 shadow-xs transition-colors duration-200 ${darkMode ? 'border-zinc-800 bg-zinc-900/80' : 'border-slate-200 bg-white/80'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              N
            </div>
            <div>
              <h1 className={`text-base font-bold tracking-tight ${darkMode ? 'text-zinc-100' : 'text-slate-900'}`}>Nexus Management</h1>
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Enterprise Supply Chain & Intelligence</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`text-xs font-medium px-3 py-2 rounded-lg transition-colors border cursor-pointer shadow-2xs flex items-center gap-2 ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'}`}
            >
              <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>

            <button 
              onClick={exportCSV}
              className={`text-xs font-medium px-3.5 py-2 rounded-lg transition-colors border cursor-pointer shadow-2xs flex items-center gap-2 ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'}`}
            >
              <span>Export CSV</span>
            </button>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <span>+ New SKU</span>
            </button>

            <div className={`flex items-center gap-2 border rounded-lg px-3 py-1.5 ${darkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-100 border-slate-300'}`}>
              <span className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Tenant:</span>
              <select 
                value={tenantId} 
                onChange={(e) => { setTenantId(Number(e.target.value)); setCart([]); }}
                className={`bg-transparent text-xs font-semibold outline-none cursor-pointer ${darkMode ? 'text-zinc-200' : 'text-slate-800'}`}
              >
                <option value={1} className={darkMode ? 'bg-zinc-900 text-zinc-200' : ''}>MedPlus</option>
  <option value={2} className={darkMode ? 'bg-zinc-900 text-zinc-200' : ''}>Q-Mart</option>
  <option value={3} className={darkMode ? 'bg-zinc-900 text-zinc-200' : ''}>Bajaj Electronics</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-8 pt-8">
        {/* Navigation Tabs */}
        <nav className={`flex justify-center border-b mb-8 overflow-x-auto gap-2 ${darkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
      {[
        { id: 'overview', label: 'Overview', badge: null },
        { id: 'inventory', label: 'Inventory', badge: current.inventory.length },
        { id: 'billing', label: 'POS Terminal', badge: cart.length > 0 ? cart.length : null },
        { id: 'forecast', label: 'Demand Forecast', badge: null },
        { id: 'procurement', label: 'Restock & POs', badge: lowStockItems.length > 0 ? lowStockItems.length : null }
      ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 text-xs font-semibold transition-colors relative whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : darkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
              {tab.badge !== null && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  tab.id === 'procurement' 
                    ? darkMode ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60' : 'bg-amber-100 text-amber-700 border border-amber-200' 
                    : darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* TAB 0: EXECUTIVE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`border p-5 rounded-xl shadow-2xs transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                <p className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Total Inventory Valuation</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-zinc-100' : 'text-slate-900'}`}>${totalValuation}</p>
              </div>
              <div className={`border p-5 rounded-xl shadow-2xs transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                <p className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Projected 30-Day Revenue</p>
                <p className="text-2xl font-bold text-indigo-500 mt-2">${totalProjectedRevenue}</p>
              </div>
              <div className={`border p-5 rounded-xl shadow-2xs transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                <p className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Tracked SKUs</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-zinc-100' : 'text-slate-900'}`}>{current.inventory.length}</p>
              </div>
              <div className={`border p-5 rounded-xl shadow-2xs transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                <p className={`text-xs font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Active Stock Shortages</p>
                <p className="text-2xl font-bold text-amber-500 mt-2">{lowStockItems.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <div className={`border rounded-xl p-6 shadow-2xs transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 ${darkMode ? 'text-zinc-400' : 'text-slate-400'}`}>Tenant Context</h3>
                <div className="space-y-3 text-xs">
                  <div className={`flex justify-between py-2 border-b ${darkMode ? 'border-zinc-800 text-zinc-300' : 'border-slate-100 text-slate-800'}`}>
                    <span className={darkMode ? 'text-zinc-400' : 'text-slate-500'}>Organization</span>
                    <span className="font-semibold">{current.name}</span>
                  </div>
                  <div className={`flex justify-between py-2 border-b ${darkMode ? 'border-zinc-800 text-zinc-300' : 'border-slate-100 text-slate-800'}`}>
                    <span className={darkMode ? 'text-zinc-400' : 'text-slate-500'}>Isolation Namespace</span>
                    <span className="font-mono text-indigo-500">tenant_ctx_0{tenantId}</span>
                  </div>
                  <div className={`flex justify-between py-2 ${darkMode ? 'text-zinc-300' : 'text-slate-800'}`}>
                    <span className={darkMode ? 'text-zinc-400' : 'text-slate-500'}>Intelligence Engine</span>
                    <span className="text-emerald-500 font-semibold">Pandas / FastAPI Online</span>
                  </div>
                </div>
              </div>

              <div className={`border rounded-xl p-6 shadow-2xs transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 ${darkMode ? 'text-zinc-400' : 'text-slate-400'}`}>System Infrastructure</h3>
                <div className="space-y-3 text-xs">
                  <div className={`flex justify-between py-2 border-b ${darkMode ? 'border-zinc-800 text-zinc-300' : 'border-slate-100 text-slate-800'}`}>
                    <span className={darkMode ? 'text-zinc-400' : 'text-slate-500'}>Database Layer</span>
                    <span className="text-emerald-500 font-semibold">PostgreSQL (Docker Active)</span>
                  </div>
                  <div className={`flex justify-between py-2 border-b ${darkMode ? 'border-zinc-800 text-zinc-300' : 'border-slate-100 text-slate-800'}`}>
                    <span className={darkMode ? 'text-zinc-400' : 'text-slate-500'}>API Gateway</span>
                    <span className="text-emerald-500 font-semibold">FastAPI Service Healthy</span>
                  </div>
                  <div className={`flex justify-between py-2 ${darkMode ? 'text-zinc-300' : 'text-slate-800'}`}>
                    <span className={darkMode ? 'text-zinc-400' : 'text-slate-500'}>Frontend Workspace</span>
                    <span className="text-emerald-500 font-semibold">Vite + React + Tailwind v4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className={`border rounded-xl overflow-hidden shadow-2xs transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
            <div className={`px-6 py-4 border-b flex flex-col md:flex-row justify-between items-center gap-4 ${darkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
              <h2 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Inventory Registry</h2>
              <input 
                type="text" 
                placeholder="Filter SKUs or products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full md:w-64 border text-xs rounded-lg px-3.5 py-2 outline-none focus:border-indigo-500 transition-colors ${darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-200' : 'bg-slate-50 border-slate-300 text-slate-800'}`}
              />
            </div>
            <div className="overflow-x-auto">
              <table className={`w-full text-left text-xs ${darkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                <thead className={`text-[11px] uppercase tracking-wider border-b ${darkMode ? 'bg-zinc-950/70 text-zinc-400 border-zinc-800' : 'bg-slate-100/70 text-slate-500 border-slate-200'}`}>
                  <tr>
                    <th className="px-6 py-3.5 font-semibold">SKU</th>
                    <th className="px-6 py-3.5 font-semibold">Product Name</th>
                    <th className="px-6 py-3.5 font-semibold">Category</th>
                    <th className="px-6 py-3.5 font-semibold">Supplier</th>
                    <th className="px-6 py-3.5 font-semibold">Price</th>
                    <th className="px-6 py-3.5 font-semibold">Stock Qty</th>
                    <th className="px-6 py-3.5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-zinc-800' : 'divide-slate-100'}`}>
                  {filteredInventory.map((item, idx) => {
                    const isLow = item.qty <= item.reorder_point;
                    return (
                      <tr key={idx} className={`transition-colors ${darkMode ? 'hover:bg-zinc-800/40' : 'hover:bg-slate-50/80'}`}>
                        <td className="px-6 py-4 font-mono text-indigo-500 font-medium">{item.sku}</td>
                        <td className={`px-6 py-4 font-semibold ${darkMode ? 'text-zinc-100' : 'text-slate-900'}`}>{item.name}</td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{item.category}</td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{item.supplier}</td>
                        <td className={`px-6 py-4 font-medium ${darkMode ? 'text-zinc-200' : 'text-slate-800'}`}>${item.price.toFixed(2)}</td>
                        <td className={`px-6 py-4 font-bold ${isLow ? 'text-amber-500' : 'text-emerald-500'}`}>{item.qty} units</td>
                        <td className="px-6 py-4">
                          {isLow ? (
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${darkMode ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>Low Stock</span>
                          ) : (
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${darkMode ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>Healthy</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: BILLING & POS TERMINAL */}
        {activeTab === 'billing' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`border rounded-xl p-6 shadow-2xs flex flex-col h-[70vh] transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-5">
                <h2 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>POS Register Catalog</h2>
                <input 
                  type="text" 
                  placeholder="Search catalog..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full md:w-60 border text-xs rounded-lg px-3.5 py-2 outline-none focus:border-indigo-500 transition-colors ${darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-200' : 'bg-slate-50 border-slate-300 text-slate-800'}`}
                />
              </div>

              <div className="overflow-y-auto flex-1 pr-1 grid grid-cols-1 md:grid-cols-2 gap-3 content-start">
                {filteredInventory.map((item, idx) => {
                  const isLow = item.qty <= item.reorder_point;
                  return (
                    <div key={idx} className={`border p-4 rounded-lg flex flex-col justify-between transition-colors ${darkMode ? 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-[11px] font-mono text-indigo-500 font-medium">{item.sku}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isLow ? darkMode ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60' : 'bg-amber-100 text-amber-700 border border-amber-200' : darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-200 text-slate-700'}`}>
                            Stock: {item.qty}
                          </span>
                        </div>
                        <h3 className={`text-xs font-semibold mt-2 ${darkMode ? 'text-zinc-100' : 'text-slate-900'}`}>{item.name}</h3>
                        <p className="text-sm font-bold text-emerald-500 mt-2">${item.price.toFixed(2)}</p>
                      </div>
                      <button 
                        disabled={item.qty <= 0}
                        onClick={() => addToCart(item)}
                        className={`mt-4 w-full py-2 rounded-lg text-xs font-semibold transition-colors shadow-2xs ${
                          item.qty > 0 
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer' 
                            : darkMode ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {item.qty > 0 ? 'Add to Invoice' : 'Out of Stock'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`border rounded-xl p-6 shadow-2xs flex flex-col justify-between h-[70vh] transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
              <div>
                <div className={`flex justify-between items-center mb-4 border-b pb-3 ${darkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
                  <h2 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Active Invoice Order</h2>
                  <span className={`text-[10px] border px-2 py-0.5 rounded-full font-bold ${darkMode ? 'bg-indigo-950/60 text-indigo-400 border-indigo-800/60' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
                    {cart.length} items
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className={`text-center py-24 text-xs ${darkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                    Register is empty. Select items to begin billing.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[30vh] overflow-y-auto pr-1">
                    {cart.map((cartItem, idx) => (
                      <div key={idx} className={`border p-3 rounded-lg flex justify-between items-center transition-colors ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="max-w-[130px]">
                          <p className={`text-xs font-semibold truncate ${darkMode ? 'text-zinc-200' : 'text-slate-800'}`}>{cartItem.name}</p>
                          <p className={`text-[10px] ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>${cartItem.price.toFixed(2)} / unit</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center border rounded-md ${darkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-300'}`}>
                            <button onClick={() => updateCartQuantity(cartItem.sku, -1)} className={`px-1.5 py-0.5 text-xs cursor-pointer ${darkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-600 hover:text-slate-900'}`}>-</button>
                            <span className={`text-xs font-bold px-1 ${darkMode ? 'text-zinc-200' : 'text-slate-800'}`}>{cartItem.cartQty}</span>
                            <button onClick={() => updateCartQuantity(cartItem.sku, 1)} className={`px-1.5 py-0.5 text-xs cursor-pointer ${darkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-600 hover:text-slate-900'}`}>+</button>
                          </div>
                          <span className="text-xs font-bold text-emerald-500 w-14 text-right">${(cartItem.price * cartItem.cartQty).toFixed(2)}</span>
                          <button onClick={() => removeFromCart(cartItem.sku)} className="text-slate-400 hover:text-rose-500 font-bold ml-1 cursor-pointer">&times;</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={`border-t pt-4 space-y-3 ${darkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
                <div className={`flex items-center justify-between text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                  <span>Discount:</span>
                  <select 
            value={tenantId} 
            onChange={(e) => { setTenantId(Number(e.target.value)); setCart([]); }}
            className={`bg-transparent text-xs font-semibold outline-none cursor-pointer ${darkMode ? 'text-zinc-200' : 'text-slate-800'}`}
          >
            <option value={1} className={darkMode ? 'bg-zinc-900 text-zinc-200' : ''}>MedPlus</option>
            <option value={2} className={darkMode ? 'bg-zinc-900 text-zinc-200' : ''}>Q-Mart</option>
            <option value={3} className={darkMode ? 'bg-zinc-900 text-zinc-200' : ''}>Bajaj Electronics</option>
          </select>
                </div>

                <div className={`flex justify-between text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-xs text-amber-500 font-medium">
                    <span>Discount applied ({discountPercent}%):</span>
                    <span>-${calculateDiscountAmount().toFixed(2)}</span>
                  </div>
                )}
                <div className={`flex justify-between text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                  <span>Estimated Tax (8%):</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>

                <div className={`flex justify-between items-center pt-2 border-t ${darkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
                  <span className={`text-xs font-bold ${darkMode ? 'text-zinc-200' : 'text-slate-800'}`}>Total Due:</span>
                  <span className="text-xl font-extrabold text-emerald-500">${calculateTotal()}</span>
                </div>

                <button 
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                  className={`w-full py-2.5 rounded-lg font-semibold text-xs transition-colors shadow-2xs ${
                    cart.length > 0 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer' 
                      : darkMode ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Complete Sale & Print Receipt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEMAND FORECASTING */}
        {activeTab === 'forecast' && (
          <div className={`border rounded-xl overflow-hidden shadow-2xs transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
            <div className={`px-6 py-4 border-b flex justify-between items-center ${darkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
              <h2 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>ML Demand Forecasting (30-Day Horizon)</h2>
              <span className={`text-[10px] border px-2.5 py-1 rounded-full font-bold ${darkMode ? 'bg-indigo-950/60 text-indigo-400 border-indigo-800/60' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>Pandas Engine</span>
            </div>
            <div className="overflow-x-auto">
              <table className={`w-full text-left text-xs ${darkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                <thead className={`text-[11px] uppercase tracking-wider border-b ${darkMode ? 'bg-zinc-950/70 text-zinc-400 border-zinc-800' : 'bg-slate-100/70 text-slate-500 border-slate-200'}`}>
                  <tr>
                    <th className="px-6 py-3.5 font-semibold">SKU</th>
                    <th className="px-6 py-3.5 font-semibold">Product Name</th>
                    <th className="px-6 py-3.5 font-semibold">Category</th>
                    <th className="px-6 py-3.5 font-semibold">Predicted 30-Day Demand</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-zinc-800' : 'divide-slate-100'}`}>
                  {current.forecast.map((pred, idx) => (
                    <tr key={idx} className={`transition-colors ${darkMode ? 'hover:bg-zinc-800/40' : 'hover:bg-slate-50/80'}`}>
                      <td className="px-6 py-4 font-mono text-indigo-500 font-medium">{pred.sku}</td>
                      <td className={`px-6 py-4 font-semibold ${darkMode ? 'text-zinc-100' : 'text-slate-900'}`}>{pred.name}</td>
                      <td className={`px-6 py-4 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{pred.category}</td>
                      <td className="px-6 py-4 text-emerald-500 font-bold">{pred.predicted_demand} units</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PROCUREMENT & RESTOCK ALERTS */}
        {activeTab === 'procurement' && (
          <div className={`border rounded-xl overflow-hidden shadow-2xs transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
            <div className={`px-6 py-4 border-b flex justify-between items-center ${darkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
              <h2 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Automated Restock & Procurement Recommendations</h2>
              <span className={`text-[10px] border px-2.5 py-1 rounded-full font-bold ${darkMode ? 'bg-amber-950/60 text-amber-400 border-amber-800/60' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>Action Required</span>
            </div>
            <div className="overflow-x-auto">
              <table className={`w-full text-left text-xs ${darkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                <thead className={`text-[11px] uppercase tracking-wider border-b ${darkMode ? 'bg-zinc-950/70 text-zinc-400 border-zinc-800' : 'bg-slate-100/70 text-slate-500 border-slate-200'}`}>
                  <tr>
                    <th className="px-6 py-3.5 font-semibold">SKU</th>
                    <th className="px-6 py-3.5 font-semibold">Product Name</th>
                    <th className="px-6 py-3.5 font-semibold">Current Qty</th>
                    <th className="px-6 py-3.5 font-semibold">Reorder Threshold</th>
                    <th className="px-6 py-3.5 font-semibold">Supplier</th>
                    <th className="px-6 py-3.5 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-zinc-800' : 'divide-slate-100'}`}>
                  {lowStockItems.length > 0 ? (
                    lowStockItems.map((item, idx) => (
                      <tr key={idx} className={`transition-colors ${darkMode ? 'hover:bg-zinc-800/40' : 'hover:bg-slate-50/80'}`}>
                        <td className="px-6 py-4 font-mono text-indigo-500 font-medium">{item.sku}</td>
                        <td className={`px-6 py-4 font-semibold ${darkMode ? 'text-zinc-100' : 'text-slate-900'}`}>{item.name}</td>
                        <td className="px-6 py-4 text-amber-500 font-bold">{item.qty} units</td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{item.reorder_point} units</td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-zinc-300' : 'text-slate-700'}`}>{item.supplier}</td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => triggerNotification(`Purchase order generated and dispatched to ${item.supplier}.`)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] px-3 py-1.5 rounded-md font-semibold transition-colors shadow-2xs cursor-pointer"
                          >
                            Generate PO
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className={`px-6 py-12 text-center ${darkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                        All inventory stock levels are healthy. No restock alerts active.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Add SKU Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4 z-50">
          <div className={`border rounded-xl max-w-md w-full p-6 shadow-xl transition-colors ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-5">
              <h3 className={`text-sm font-bold ${darkMode ? 'text-zinc-100' : 'text-slate-900'}`}>Register New Inventory SKU</h3>
              <button onClick={() => setIsModalOpen(false)} className={`text-base font-bold cursor-pointer ${darkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-400 hover:text-slate-700'}`}>&times;</button>
            </div>
            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div>
                <label className={`block mb-1.5 font-semibold ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>Product Name</label>
                <input type="text" required placeholder="e.g. Organic Almond Milk" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className={`w-full border rounded-lg px-3.5 py-2 outline-none focus:border-indigo-500 ${darkMode ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
              </div>
              <div>
                <label className={`block mb-1.5 font-semibold ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>SKU Code</label>
                <input type="text" required placeholder="e.g. SKU-RET-099" value={newItemSku} onChange={(e) => setNewItemSku(e.target.value)} className={`w-full border rounded-lg px-3.5 py-2 outline-none focus:border-indigo-500 ${darkMode ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
              </div>
              <div>
                <label className={`block mb-1.5 font-semibold ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>Category</label>
                <input type="text" placeholder="e.g. Dairy" value={newItemCategory} onChange={(e) => setNewItemCategory(e.target.value)} className={`w-full border rounded-lg px-3.5 py-2 outline-none focus:border-indigo-500 ${darkMode ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block mb-1.5 font-semibold ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>Unit Price ($)</label>
                  <input type="number" step="0.01" required placeholder="4.99" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} className={`w-full border rounded-lg px-3.5 py-2 outline-none focus:border-indigo-500 ${darkMode ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
                </div>
                <div>
                  <label className={`block mb-1.5 font-semibold ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>Initial Qty</label>
                  <input type="number" required placeholder="50" value={newItemQty} onChange={(e) => setNewItemQty(e.target.value)} className={`w-full border rounded-lg px-3.5 py-2 outline-none focus:border-indigo-500 ${darkMode ? 'bg-zinc-950 border-zinc-700 text-zinc-100' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
                </div>
              </div>
              <div className={`flex justify-end gap-2.5 pt-4 border-t ${darkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
                <button type="button" onClick={() => setIsModalOpen(false)} className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>Cancel</button>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-2xs cursor-pointer">Save SKU</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {isReceiptModalOpen && lastCompletedOrder && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4 z-50">
          <div className="bg-white text-slate-900 rounded-xl max-w-md w-full p-6 shadow-xl font-mono border border-slate-200">
            <div className="text-center pb-4 border-b border-dashed border-slate-300">
              <h3 className="text-sm font-bold">{lastCompletedOrder.tenantName}</h3>
              <p className="text-[10px] text-slate-500">Official POS Sales Receipt</p>
              <p className="text-[10px] text-slate-500 mt-1.5">{lastCompletedOrder.orderId} | {lastCompletedOrder.date}</p>
            </div>

            <div className="py-4 space-y-2 max-h-52 overflow-y-auto border-b border-dashed border-slate-300 text-xs">
              {lastCompletedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-[10px] text-slate-500">{item.cartQty} × ${item.price.toFixed(2)}</p>
                  </div>
                  <span className="font-bold">${(item.price * item.cartQty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="py-3 space-y-1 text-xs border-b border-dashed border-slate-300">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>${lastCompletedOrder.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Discount Applied:</span>
                <span>-${lastCompletedOrder.discount}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (8%):</span>
                <span>${lastCompletedOrder.tax}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-2 text-slate-900">
                <span>Total Paid:</span>
                <span>${lastCompletedOrder.total}</span>
              </div>
            </div>

            <div className="text-center pt-4 space-y-2">
              <p className="text-[10px] text-slate-500 mb-2">Thank you for your business.</p>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-xs font-sans font-semibold transition-colors cursor-pointer shadow-2xs"
                >
                  Print Receipt
                </button>
                <button 
                  onClick={() => setIsReceiptModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-xs font-sans font-semibold transition-colors cursor-pointer"
                >
                  Close Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;