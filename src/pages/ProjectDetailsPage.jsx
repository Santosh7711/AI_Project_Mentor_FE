// Project Details page: shows full project info, overall progress, and
// the list of tasks belonging to the project.

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Common/Modal';
import EmptyState from '../components/Common/EmptyState';
import Badge from '../components/Common/Badge';
import ProjectForm from '../components/Projects/ProjectForm';
import TaskForm from '../components/Tasks/TaskForm';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, tasks, updateProject, addTask } = useApp();
  const [editOpen, setEditOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const project = projects.find((p) => p.id === Number(id));
  if (!project) {
    return (
      <EmptyState
        title="Project could not be found"
        message="The project you are looking for does not exist or has been deleted."
        action={
          <Link to="/projects" className="btn btn-primary">
            Back to Projects
          </Link>
        }
      />
    );
  }

  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const completed = projectTasks.filter((t) => t.status === 'Completed').length;
  const percent =
    projectTasks.length === 0
      ? 0
      : Math.round((completed / projectTasks.length) * 100);

  const priorityVariant = (priority) => {
    if (priority === 'High') return 'red';
    if (priority === 'Medium') return 'orange';
    return 'green';
  };
  const statusVariant = (status) => {
    if (status === 'Completed') return 'green';
    if (status === 'In Progress') return 'blue';
    return 'yellow';
  };

  return (
    <div className="page">
      <div className="page-toolbar">
        <Link to="/projects" className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} aria-hidden="true" />
          Return to Projects
        </Link>
      </div>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">{project.name}</h2>
          <span className="project-card-id">#{project.id}</span>
        </div>
        <div className="card-body">
          <p className="project-detail-desc">{project.description}</p>
          <div className="project-detail-meta">
            <div className="meta-item">
              <span className="meta-label">Technology Stack</span>
              <div className="project-card-tech">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-label">Created</span>
              <span>{project.createdAt}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Total Tasks</span>
              <span>{projectTasks.length}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Completed Tasks</span>
              <span>{completed}</span>
            </div>
          </div>
          <div className="progress-row">
            <div className="progress-row-top">
              <span className="progress-row-name">Overall Progress</span>
              <span className="progress-row-percent">{percent}%</span>
            </div>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${percent}%` }}
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
          <div className="project-detail-actions">
            <button type="button" className="btn btn-primary" onClick={() => setAddTaskOpen(true)}>
              <Plus size={18} aria-hidden="true" />
              Add Task
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditOpen(true)}>
              <Pencil size={18} aria-hidden="true" />
              Edit Project
            </button>
            <Link to="/ai-mentor" className="btn btn-accent">
              <Sparkles size={18} aria-hidden="true" />
              Ask AI Mentor
            </Link>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Tasks</h2>
        </div>
        <div className="card-body">
          {projectTasks.length === 0 ? (
            <EmptyState
              title="No tasks yet"
              message="Add the first task to this project."
              action={
                <button type="button" className="btn btn-primary" onClick={() => setAddTaskOpen(true)}>
                  <Plus size={18} aria-hidden="true" />
                  Add Task
                </button>
              }
            />
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>AI</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {projectTasks.map((task) => (
                    <tr key={task.id}>
                      <td>
                        <div className="task-title-cell">{task.title}</div>
                        <div className="task-desc-cell">{task.description}</div>
                      </td>
                      <td>
                        <Badge label={task.priority} variant={priorityVariant(task.priority)} />
                      </td>
                      <td>
                        <Badge label={task.status} variant={statusVariant(task.status)} />
                      </td>
                      <td>{task.aiGenerated ? <Badge label="AI" variant="indigo" /> : '—'}</td>
                      <td>{task.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {editOpen && (
        <Modal title="Edit Project" onClose={() => setEditOpen(false)}>
          <ProjectForm
            initialData={project}
            onSave={(data) => {
              updateProject(project.id, data);
              setEditOpen(false);
            }}
            onCancel={() => setEditOpen(false)}
          />
        </Modal>
      )}

      {addTaskOpen && (
        <Modal title="Add Task" onClose={() => setAddTaskOpen(false)}>
          <TaskForm
            initialData={{ projectId: project.id }}
            projects={projects}
            onSave={(data) => {
              addTask(data);
              setAddTaskOpen(false);
            }}
            onCancel={() => setAddTaskOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
