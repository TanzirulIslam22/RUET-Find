import axios from 'axios';

const PROD_API_URL = 'https://ruet-find-production.up.railway.app/api';

function resolveBaseUrl(raw) {
  const url = (raw || '').trim().replace(/\/+$/, '');
  if (url) {
    return url.endsWith('/api') ? url : `${url}/api`;
  }
  return import.meta.env.PROD ? PROD_API_URL : '/api';
}

const api = axios.create({
  baseURL: resolveBaseUrl(import.meta.env.VITE_API_URL),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success !== undefined) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('auth:logout'));
    }
    return Promise.reject(error);
  }
);

export default api;
