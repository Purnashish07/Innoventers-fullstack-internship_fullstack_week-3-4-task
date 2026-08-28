import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/axios';

export const fetchAdminStats = createAsyncThunk('admin/fetchStats', async (_, {rejectWithValue})=>{
  try {
    const {data} = await API.get('/admin/stats');
    return data.data;
  } catch(e) {
    return rejectWithValue(e.response?.data || {message: e.message});
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: null,
    recentUsers: [],
    recentProjects: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.recentUsers = action.payload.recentUsers;
        state.recentProjects = action.payload.recentProjects;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch admin stats';
      });
  }
});

export default adminSlice.reducer;
