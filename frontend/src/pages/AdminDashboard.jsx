import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStats } from '../store/adminSlice';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { stats, recentUsers, recentProjects, loading, error } = useSelector(s => s.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  if (loading && !stats) {
    return <div className="flex-center" style={{minHeight: '50vh'}}><div className="spinner"></div></div>;
  }

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Admin Overview</h2>
        <p>Platform statistics and recent activity.</p>
      </div>

      {error && <div style={{color: 'var(--danger)', marginBottom: '1rem'}}>{error}</div>}

      {stats && (
        <>
          <div className="card-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}}>
            <div className="glass-panel" style={{padding: '1.5rem', textAlign: 'center'}}>
              <h3 style={{fontSize: '2.5rem', color: 'var(--primary)', margin: 0}}>{stats.users}</h3>
              <p style={{margin: 0}}>Total Users</p>
            </div>
            <div className="glass-panel" style={{padding: '1.5rem', textAlign: 'center'}}>
              <h3 style={{fontSize: '2.5rem', color: 'var(--primary)', margin: 0}}>{stats.projects}</h3>
              <p style={{margin: 0}}>Total Projects</p>
            </div>
            <div className="glass-panel" style={{padding: '1.5rem', textAlign: 'center'}}>
              <h3 style={{fontSize: '2.5rem', color: 'var(--warning)', margin: 0}}>{stats.pending}</h3>
              <p style={{margin: 0}}>Pending</p>
            </div>
            <div className="glass-panel" style={{padding: '1.5rem', textAlign: 'center'}}>
              <h3 style={{fontSize: '2.5rem', color: 'var(--success)', margin: 0}}>{stats.completed}</h3>
              <p style={{margin: 0}}>Completed</p>
            </div>
          </div>

          <div className="card-grid mt-8" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'}}>
            <div className="glass-panel" style={{padding: '1.5rem'}}>
              <h3 className="mb-4">Recent Users</h3>
              {recentUsers?.length === 0 ? <p>No users yet.</p> : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  {recentUsers?.map(u => (
                    <div key={u._id} className="flex-between" style={{paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)'}}>
                      <div>
                        <strong>{u.name}</strong>
                        <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>{u.email}</div>
                      </div>
                      <span className="role-tag">{u.role}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-panel" style={{padding: '1.5rem'}}>
              <h3 className="mb-4">Recent Projects</h3>
              {recentProjects?.length === 0 ? <p>No projects yet.</p> : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  {recentProjects?.map(p => (
                    <div key={p._id} className="flex-between" style={{paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)'}}>
                      <div>
                        <strong>{p.title}</strong>
                        <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>By {p.owner?.name}</div>
                      </div>
                      <span className={`status-badge status-${p.status}`}>{p.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}