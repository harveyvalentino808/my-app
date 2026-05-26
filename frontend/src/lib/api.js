// API client untuk Unique Vintage backend
const BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

const getToken = () => localStorage.getItem('uv_token');

const headers = (extra = {}) => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  ...extra,
});

const req = async (method, path, body) => {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    method,
    headers: headers(),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Request failed');
  return data;
};

export const api = {
  // Auth
  register: (data) => req('POST', '/auth/register', data),
  login: (data) => req('POST', '/auth/login', data),
  me: () => req('GET', '/auth/me'),

  // Profile
  updateProfile: (data) => req('PUT', '/profile', data),
  updatePassword: (data) => req('PUT', '/profile/password', data),

  // Addresses
  getAddresses: () => req('GET', '/addresses'),
  addAddress: (data) => req('POST', '/addresses', data),
  updateAddress: (id, data) => req('PUT', `/addresses/${id}`, data),
  deleteAddress: (id) => req('DELETE', `/addresses/${id}`),

  // Wishlist
  getWishlist: () => req('GET', '/wishlist'),
  addToWishlist: (data) => req('POST', '/wishlist', data),
  removeFromWishlist: (productId) => req('DELETE', `/wishlist/${productId}`),

  // Orders
  createOrder: (data) => req('POST', '/orders', data),
  getOrders: () => req('GET', '/orders'),
  getOrder: (id) => req('GET', `/orders/${id}`),
};

export const setToken = (token) => localStorage.setItem('uv_token', token);
export const clearToken = () => localStorage.removeItem('uv_token');
export const isLoggedIn = () => !!getToken();
