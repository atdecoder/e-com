import axios from 'axios';
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export const fetchProducts = (params) => axios.get(`${API_BASE}/api/v1/products`, { params, withCredentials: true  }).then(r => r.data);
export const addProduct = (payload) => axios.post(`${API_BASE}/api/v1/products`, payload, { withCredentials: true }).then(r => r.data);
export const login = (payload) => axios.post(`${API_BASE}/api/v1/users/login`, payload, { withCredentials: true }).then(r => r.data);
export const logout = (payload) => axios.post(`${API_BASE}/api/v1/users/logout`, payload, { withCredentials: true }).then(r => r.data);
export const authCheck = (payload) => axios.get(`${API_BASE}/api/v1/users/auth-check`, { withCredentials: true }).then(r => r.data);
