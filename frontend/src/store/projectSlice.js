import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/axios';

export const fetchProjects = createAsyncThunk('projects/fetch', async (filters, {rejectWithValue})=>{
  try{ const {data}=await API.get('/projects',{params:filters}); return data; } catch(e){ return rejectWithValue(e.response.data); }
});
export const createProject = createAsyncThunk('projects/create', async (body, {rejectWithValue})=>{
  try{ const {data}=await API.post('/projects',body); return data.data; } catch(e){ return rejectWithValue(e.response.data); }
});
export const updateProject = createAsyncThunk('projects/update', async ({id, body}, {rejectWithValue})=>{
  try{ const {data}=await API.put(`/projects/${id}`, body); return data.data; } catch(e){ return rejectWithValue(e.response.data); }
});
export const deleteProject = createAsyncThunk('projects/delete', async (id, {rejectWithValue})=>{
  try{ await API.delete(`/projects/${id}`); return id; } catch(e){ return rejectWithValue(e.response.data); }
});

const slice = createSlice({
  name:'projects',
  initialState:{ list:[], loading:false, error:null, count:0 },
  reducers:{},
  extraReducers:(b)=>{
    b.addCase(fetchProjects.pending,(s)=>{s.loading=true}).addCase(fetchProjects.fulfilled,(s,a)=>{s.loading=false; s.list=a.payload.data; s.count=a.payload.count}).addCase(fetchProjects.rejected,(s,a)=>{s.loading=false; s.error=a.payload?.message})
     .addCase(createProject.fulfilled,(s,a)=>{s.list.unshift(a.payload)})
     .addCase(updateProject.fulfilled,(s,a)=>{
       const index = s.list.findIndex(p => p._id === a.payload._id);
       if(index !== -1) s.list[index] = a.payload;
     })
     .addCase(deleteProject.fulfilled,(s,a)=>{
       s.list = s.list.filter(p => p._id !== a.payload);
       s.count = Math.max(0, s.count - 1);
     });
  }
});
export default slice.reducer;
