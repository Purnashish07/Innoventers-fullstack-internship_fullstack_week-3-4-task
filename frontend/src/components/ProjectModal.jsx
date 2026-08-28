import { useState, useEffect } from 'react';

export default function ProjectModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ title: '', description: '', status: 'pending' });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'pending'
      });
    } else {
      setForm({ title: '', description: '', status: 'pending' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(form.title.length < 3) return alert('Title must be at least 3 characters long');
    onSubmit(form);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <h3>{initialData ? 'Edit Project' : 'Create New Project'}</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="input-group">
            <label className="input-label">Project Title</label>
            <input className="input-field" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="e.g. Website Redesign" required />
          </div>
          
          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea className="input-field" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Project details..." required rows="3" />
          </div>
          
          {initialData && (
            <div className="input-group">
              <label className="input-label">Status</label>
              <select className="input-field" value={form.status} onChange={e=>setForm({...form, status: e.target.value})}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          <div className="flex-between mt-8">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{initialData ? 'Save Changes' : 'Create Project'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
