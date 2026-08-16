import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '../services/adminService';

export const fetchDashboard = createAsyncThunk(
  'admin/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminService.getDashboard();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch dashboard');
    }
  }
);

export const fetchAdminItems = createAsyncThunk(
  'admin/fetchAdminItems',
  async (filters, { rejectWithValue }) => {
    try {
      const { data } = await adminService.getAllItems(filters);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch items');
    }
  }
);

export const updateItemStatus = createAsyncThunk(
  'admin/updateItemStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await adminService.updateStatus(id, status);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update status');
    }
  }
);

export const deleteItem = createAsyncThunk(
  'admin/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      await adminService.deleteItem(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete item');
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminService.getUsers();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    dashboard: null,
    items: [],
    users: [],
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || action.payload;
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchAdminItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateItemStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((i) => i._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateItemStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((i) => i._id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
