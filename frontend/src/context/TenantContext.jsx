// frontend/src/context/TenantContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTenantsData } from '../mock/initialData';
import { api } from '../api/client';

const TenantContext = createContext(null);

export const TenantProvider = ({ children }) => {
  // Hardcoded tenant definitions for the UI dropdown
  const [tenants] = useState([
    { id: 'apex_retail', name: 'Apex Retail Corp', domain: 'Retail & Electronics' },
    { id: 'global_pharma', name: 'Global Pharma Solutions', domain: 'Pharmaceuticals' },
  ]);
  
  const [activeTenantId, setActiveTenantId] = useState('apex_retail');
  const [tenantData, setTenantData] = useState(initialTenantsData);
  const [loading, setLoading] = useState(false);

  // Safely extract the active dataset
  const activeData = tenantData[activeTenantId] || { inventory: [], forecast: [], orders: [] };

  // P0 Task: Fetch live backend metrics on tenant switch
  useEffect(() => {
    let isMounted = true;
    async function loadTenantData() {
      setLoading(true);
      try {
        const [analytics, forecast] = await Promise.allSettled([
          api.getAnalytics(activeTenantId),
          api.getForecast(activeTenantId),
        ]);
        
        if (isMounted) {
          setTenantData(prev => ({
            ...prev,
            [activeTenantId]: {
              ...prev[activeTenantId],
              ...(analytics.status === 'fulfilled' && { analytics: analytics.value }),
              ...(forecast.status === 'fulfilled' && { forecast: forecast.value }),
            }
          }));
        }
      } catch (err) {
        console.warn('API unavailable, falling back to local state.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadTenantData();
    return () => { isMounted = false; };
  }, [activeTenantId]);

  // Core Business Logic: POS Inventory Auto-Deduction
  const deductInventoryFromSale = (cartItems) => {
    setTenantData(prev => {
      const currentInventory = prev[activeTenantId].inventory.map(sku => {
        const cartMatch = cartItems.find(item => item.id === sku.id || item.sku_code === sku.sku_code);
        if (cartMatch) {
          return { ...sku, stock: Math.max(0, sku.stock - cartMatch.quantity) };
        }
        return sku;
      });

      return {
        ...prev,
        [activeTenantId]: {
          ...prev[activeTenantId],
          inventory: currentInventory,
        }
      };
    });
  };

  return (
    <TenantContext.Provider value={{
      tenants,
      activeTenantId,
      setActiveTenantId,
      activeData,
      loading,
      deductInventoryFromSale
    }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);