// Projects page: responsive cards with view/edit/delete actions, a
// Create Project button, and a modal form for create/edit.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Pencil, Trash2, FolderKanban } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Common/Modal';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import EmptyState from '../components/Common/EmptyState';
import ProjectForm from '../components/Projects/ProjectForm';

export default function ProjectsPage({ search }) {
  const { projects, tasks, addProject, updateProject, deleteProject } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes((search ?? '').toLowerCase()),
  );

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(project) {
    setEditing(project);
    setModalOpen(true);
  }

  function handleSave(data) {
    if (editing) {
      updateProject(editing.id, data);
    } else {
      addProject(data);
    }
    setModalOpen(false);
  }

  function confirmDelete() {
    if (deleteTarget) {
      deleteProject(deleteTarget.id);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="page">
      <div className="page-toolbar">
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          <Plus size={18} aria-hidden="true" />
          Create Project
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No projects found"
          message="Create your first project to start adding tasks."
          icon={FolderKanban}
          action={
            <button type="button" className="btn btn-primary" onClick={openCreate}>
              <Plus size={18} aria-hidden="true" />
              Create Project
            </button>
          }
        />
      ) : (
        <div className="project-cards">
          {filtered.map((project) => {
            const projectTasks = tasks.filter((t) => t.projectId === project.id);
            const completed = projectTasks.filter(
              (t) => t.status === 'Completed',
            ).length;
            const percent =
              projectTasks.length === 0
                ? 0
                : Math.round((completed / projectTasks.length) * 100);

            return (
              <div key={project.id} className="card project-card">
                <div className="project-card-header">
                  <h3 className="project-card-name">{project.name}</h3>
                  <span className="project-card-id">#{project.id}</span>
                </div>
                <p className="project-card-desc">{project.description}</p>
                <div className="project-card-tech">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-chip">{tech}</span>
                  ))}
                </div>
                <div className="project-card-stats">
                  <span>Tasks: {projectTasks.length}</span>
                  <span>Completed: {completed}</span>
                  <span>Progress: {percent}%</span>
                </div>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="project-card-actions">
                  <Link to={`/projects/${project.id}`} className="btn btn-secondary btn-sm">
                    <Eye size={16} aria-hidden="true" />
                    View
                  </Link>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => openEdit(project)}
                  >
                    <Pencil size={16} aria-hidden="true" />
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => setDeleteTarget(project)}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <Modal
          title={editing ? 'Edit Project' : 'Create Project'}
          onClose={() => setModalOpen(false)}
        >
          <ProjectForm
            initialData={editing}
            onSave={handleSave}
            onCancel={() => setModalOpen(false)}
          />
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Project"
          message={`Are you sure you want to delete "${deleteTarget.name}"? This will also remove all tasks belonging to this project.`}
          confirmLabel="Delete Project"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
