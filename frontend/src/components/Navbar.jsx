import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

export default function Navbar() {
  const { user } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        ProjectSync
      </Link>
      <div className="nav-links">
        {user.role === 'admin' && (
          <Link to="/admin" className="btn btn-secondary" style={{padding: '0.4rem 0.8rem'}}>
            Admin Hub
          </Link>
        )}
        <div className="user-badge">
          <span>{user.name}</span>
          <span className="role-tag">{user.role}</span>
        </div>
        <button onClick={handleLogout} className="btn btn-danger" style={{padding: '0.4rem 0.8rem'}}>
          Logout
        </button>
      </div>
    </nav>
  );
}
