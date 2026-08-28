import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState(''); 
  const [password,setPassword] = useState('');
  
  const dispatch = useDispatch(); 
  const nav = useNavigate(); 
  const {loading, error, user} = useSelector(s=>s.auth);

  useEffect(() => {
    if (user) nav('/dashboard');
  }, [user, nav]);

  const submit = async(e) => {
    e.preventDefault(); 
    const res = await dispatch(loginUser({email, password})); 
    if(res.payload?.success) nav('/dashboard');
  };

  return (
    <div className="flex-center" style={{minHeight: '100vh', padding: '20px'}}>
      <div className="glass-panel" style={{width: '100%', maxWidth: '400px', padding: '2.5rem'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <h2>Welcome Back</h2>
          <p>Log in to ProjectSync</p>
        </div>
        
        {error && (
          <div style={{background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid rgba(239,68,68,0.2)'}}>
            {error}
          </div>
        )}
        
        <form onSubmit={submit}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input className="input-field" type="email" placeholder="name@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <input className="input-field" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          
          <button className="btn btn-primary" disabled={loading} style={{width: '100%', marginTop: '1rem', padding: '0.8rem'}}>
            {loading ? <div className="spinner"></div> : 'Sign In'}
          </button>
        </form>
        
        <div style={{textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem'}}>
          <span style={{color: 'var(--text-secondary)'}}>Don't have an account? </span>
          <Link to='/register'>Create one</Link>
        </div>
      </div>
    </div>
  );
}
