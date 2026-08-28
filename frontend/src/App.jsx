import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

export default function App(){ 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoute roles={['user','admin']}>
            <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route path='/admin' element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard/>
          </ProtectedRoute>
        }/>
        <Route path='*' element={<Navigate to='/dashboard' replace />}/>
      </Routes>
    </BrowserRouter>
  ); 
}
