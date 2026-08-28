export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="glass-panel project-card">
      <div className="flex-between" style={{marginBottom: '1rem'}}>
        <h3 style={{fontSize: '1.2rem', margin: 0}}>{project.title}</h3>
        <span className={`status-badge status-${project.status}`}>
          {project.status.replace('-', ' ')}
        </span>
      </div>
      
      <p style={{flexGrow: 1, fontSize: '0.95rem'}}>{project.description}</p>
      
      <div className="flex-between mt-4" style={{borderTop: '1px solid var(--border)', paddingTop: '1rem'}}>
        <button className="btn btn-secondary" onClick={() => onEdit(project)} style={{padding: '0.4rem 0.8rem'}}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(project._id)} style={{padding: '0.4rem 0.8rem'}}>
          Delete
        </button>
      </div>
    </div>
  );
}
