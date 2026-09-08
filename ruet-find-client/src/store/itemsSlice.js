import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import itemService from '../services/itemService';

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (filters, { rejectWithValue }) => {
    try {
      const { data } = await itemService.getAll(filters);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch items');
    }
  }
);

export const fetchItem = createAsyncThunk(
  'items/fetchItem',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await itemService.getById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch item');
    }
  }
);

export const fetchRecentItems = createAsyncThunk(
  'items/fetchRecentItems',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await itemService.getRecent();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch recent items');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'items/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await itemService.getCategories();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const fetchSmartMatches = createAsyncThunk(
  'items/fetchSmartMatches',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await itemService.getSmartMatches(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch matches');
    }
  }
);

export const createItem = createAsyncThunk(
  'items/createItem',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await itemService.create(formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create item');
    }
  }
);

export const claimItem = createAsyncThunk(
  'items/claimItem',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await itemService.claim(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to claim item');
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    currentItem: null,
    recentItems: [],
    categories: [],
    matches: [],
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || action.payload;
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecentItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentItems.fulfilled, (state, action) => {
        state.loading = false;
        state.recentItems = action.payload;
      })
      .addCase(fetchRecentItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSmartMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSmartMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(fetchSmartMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(claimItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(claimItem.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(claimItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default itemsSlice.reducer;
