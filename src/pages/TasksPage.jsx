// Tasks page: filterable, searchable table of all tasks with add, edit,
// change status, and delete actions.

import { useState } from 'react';
import { Plus, Pencil, Trash2, ListTodo, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Common/Modal';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import EmptyState from '../components/Common/EmptyState';
import Badge from '../components/Common/Badge';
import TaskForm from '../components/Tasks/TaskForm';

const priorityOptions = ['Low', 'Medium', 'High'];
const statusOptions = ['Pending', 'In Progress', 'Completed'];

export default function TasksPage({ search }) {
  const { projects, tasks, addTask, updateTask, updateTaskStatus, deleteTask } =
    useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [statusTarget, setStatusTarget] = useState(null);

  const [filterProject, setFilterProject] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const projectName = (projectId) =>
    projects.find((p) => p.id === projectId)?.name ?? 'Unknown';

  const filtered = tasks.filter((t) => {
    if (filterProject && t.projectId !== Number(filterProject)) return false;
    if (filterPriority && t.priority !== filterPriority) return false;
    if (filterStatus && t.status !== filterStatus) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(task) {
    setEditing(task);
    setModalOpen(true);
  }

  function handleSave(data) {
    if (editing) {
      updateTask(editing.id, data);
    } else {
      addTask(data);
    }
    setModalOpen(false);
  }

  function confirmDelete() {
    if (deleteTarget) {
      deleteTask(deleteTarget.id);
      setDeleteTarget(null);
    }
  }

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
        <div className="filters">
          <select
            aria-label="Filter by project"
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            <option value="">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <select
            aria-label="Filter by priority"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            {priorityOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            aria-label="Filter by status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          <Plus size={18} aria-hidden="true" />
          Add Task
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No tasks found"
          message="Add a task or adjust your filters."
          icon={ListTodo}
          action={
            <button type="button" className="btn btn-primary" onClick={openCreate}>
              <Plus size={18} aria-hidden="true" />
              Add Task
            </button>
          }
        />
      ) : (
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>AI</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((task) => (
                  <tr key={task.id}>
                    <td className="task-id-cell">#{task.id}</td>
                    <td>
                      <div className="task-title-cell">{task.title}</div>
                      <div className="task-desc-cell">{task.description}</div>
                    </td>
                    <td>{projectName(task.projectId)}</td>
                    <td>
                      <Badge label={task.priority} variant={priorityVariant(task.priority)} />
                    </td>
                    <td>
                      <div className="status-cell">
                        <Badge label={task.status} variant={statusVariant(task.status)} />
                        <div className="status-dropdown">
                          <button
                            type="button"
                            className="status-change-btn"
                            aria-label={`Change status for ${task.title}`}
                            onClick={() =>
                              setStatusTarget(
                                statusTarget?.id === task.id ? null : task,
                              )
                            }
                          >
                            <ChevronDown size={14} aria-hidden="true" />
                          </button>
                          {statusTarget?.id === task.id && (
                            <div className="status-menu">
                              {statusOptions.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  className={
                                    s === task.status
                                      ? 'status-menu-item status-menu-item-active'
                                      : 'status-menu-item'
                                  }
                                  onClick={() => {
                                    updateTaskStatus(task.id, s);
                                    setStatusTarget(null);
                                  }}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{task.aiGenerated ? <Badge label="AI" variant="indigo" /> : '—'}</td>
                    <td>{task.createdAt}</td>
                    <td>{task.updatedAt}</td>
                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          aria-label={`Edit ${task.title}`}
                          onClick={() => openEdit(task)}
                        >
                          <Pencil size={16} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          aria-label={`Delete ${task.title}`}
                          onClick={() => setDeleteTarget(task)}
                        >
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <Modal
          title={editing ? 'Edit Task' : 'Add Task'}
          onClose={() => setModalOpen(false)}
        >
          <TaskForm
            initialData={editing}
            projects={projects}
            onSave={handleSave}
            onCancel={() => setModalOpen(false)}
          />
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Task"
          message={`Are you sure you want to delete "${deleteTarget.title}"?`}
          confirmLabel="Delete Task"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
