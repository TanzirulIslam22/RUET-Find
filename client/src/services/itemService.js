import api from './api';

const itemService = {
  getAll: (params) => api.get('/items', { params }),

  getById: (id) => api.get(`/items/${id}`),

  create: (data) => api.post('/items', data),

  update: (id, data) => api.put(`/items/${id}`, data),

  delete: (id) => api.delete(`/items/${id}`),

  getRecent: () => api.get('/items/recent'),

  getCategories: () => api.get('/items/categories'),

  claim: (id) => api.post(`/items/${id}/claim`),

  getSmartMatches: (id) => api.get(`/items/${id}/matches`),
};

export default itemService;
