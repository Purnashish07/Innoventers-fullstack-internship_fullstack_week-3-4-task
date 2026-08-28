import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, createProject, updateProject, deleteProject } from '../store/projectSlice';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(s => s.projects);
  
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch projects
  useEffect(() => {
    dispatch(fetchProjects({ search: debouncedSearch, status: statusFilter }));
  }, [dispatch, debouncedSearch, statusFilter]);

  const handleCreateOrUpdate = async (formData) => {
    if (editingProject) {
      await dispatch(updateProject({ id: editingProject._id, body: formData }));
    } else {
      await dispatch(createProject(formData));
    }
    setModalOpen(false);
    setEditingProject(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  return (
    <div className="container">
      <div className="flex-between mb-4">
        <div>
          <h2>My Projects</h2>
          <p>Manage your tasks and keep track of your progress.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreateModal}>
          + New Project
        </button>
      </div>

      <div className="glass-panel" style={{padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
        <div className="input-group" style={{margin: 0, flex: '1 1 300px'}}>
          <input className="input-field" placeholder="Search projects by title..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="input-group" style={{margin: 0, flex: '0 1 200px'}}>
          <select className="input-field" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        {(search || statusFilter) && (
          <button className="btn btn-secondary" onClick={() => { setSearch(''); setStatusFilter(''); }}>
            Clear Filters
          </button>
        )}
      </div>

      {error && (
        <div style={{color: 'var(--danger)', marginBottom: '1rem'}}>{error}</div>
      )}

      {loading && list.length === 0 ? (
        <div className="flex-center" style={{padding: '3rem'}}>
          <div className="spinner"></div>
        </div>
      ) : list.length === 0 ? (
        <div className="glass-panel flex-center" style={{padding: '4rem', flexDirection: 'column', textAlign: 'center'}}>
          <h3 style={{color: 'var(--text-secondary)'}}>No projects found</h3>
          <p>Get started by creating a new project.</p>
          <button className="btn btn-primary mt-2" onClick={openCreateModal}>Create Project</button>
        </div>
      ) : (
        <div className="card-grid">
          {list.map(p => (
            <ProjectCard key={p._id} project={p} onEdit={openEditModal} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <ProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleCreateOrUpdate} initialData={editingProject} />
    </div>
  );
}
