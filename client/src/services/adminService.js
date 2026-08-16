import api from './api';

const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),

  getAllItems: (params) => api.get('/admin/items', { params }),

  updateStatus: (id, itemStatus) => api.put(`/admin/items/${id}/status`, { itemStatus }),

  deleteItem: (id) => api.delete(`/admin/items/${id}`),

  getUsers: () => api.get('/admin/users'),
};

export default adminService;
