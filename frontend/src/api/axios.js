import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });


API.interceptors.request.use((req)=>{
  const t=localStorage.getItem('token');
  if(t) req.headers.Authorization=`Bearer ${t}`;
  return req;
});

API.interceptors.response.use(res=>res, err=>{
  if(err.response?.status===401){ 
    // Usually means token expired or invalid
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href='/login'; 
  }
  return Promise.reject(err);
});

export default API;
