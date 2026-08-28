import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/axios';
export const loginUser = createAsyncThunk('auth/login', async ({email,password}, {rejectWithValue})=>{
  try{ const {data}=await API.post('/auth/login',{email,password}); localStorage.setItem('token',data.token); localStorage.setItem('user',JSON.stringify(data.user)); return data; } catch(e){ return rejectWithValue(e.response.data); }
});
export const registerUser = createAsyncThunk('auth/register', async (form, {rejectWithValue})=>{
  try{ const {data}=await API.post('/auth/register',form); localStorage.setItem('token',data.token); localStorage.setItem('user',JSON.stringify(data.user)); return data; } catch(e){ return rejectWithValue(e.response.data); }
});
const slice = createSlice({
  name:'auth',
  initialState:{ user: JSON.parse(localStorage.getItem('user')||'null'), loading:false, error:null },
  reducers:{ logout:(s)=>{ s.user=null; localStorage.clear(); } },
  extraReducers:(b)=>{
    b.addCase(loginUser.pending,(s)=>{s.loading=true; s.error=null}).addCase(loginUser.fulfilled,(s,a)=>{s.loading=false; s.user=a.payload.user}).addCase(loginUser.rejected,(s,a)=>{s.loading=false; s.error=a.payload?.message})
     .addCase(registerUser.pending,(s)=>{s.loading=true}).addCase(registerUser.fulfilled,(s,a)=>{s.loading=false; s.user=a.payload.user}).addCase(registerUser.rejected,(s,a)=>{s.loading=false; s.error=a.payload?.message});
  }
});
export const {logout}=slice.actions;
export default slice.reducer;
