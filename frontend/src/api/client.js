// frontend/src/api/client.js

// Points to your FastAPI backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[API Client] Fallback mode active for ${endpoint}:`, error.message);
    throw error; // Let the context provider handle the fallback
  }
}

export const api = {
  // Endpoints mapped in the handover document
  getAnalytics: (tenantId) => request(`/analytics/${tenantId}`),
  getForecast: (tenantId) => request(`/forecast/${tenantId}`),
  
  // Future-proofing standard CRUD operations
  getInventory: (tenantId) => request(`/inventory/${tenantId}`),
  addSku: (tenantId, skuData) =>
    request(`/inventory/${tenantId}`, {
      method: 'POST',
      body: JSON.stringify(skuData),
    }),
};