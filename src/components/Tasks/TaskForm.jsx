// Reusable Add/Edit Task form. Used in a modal on the Tasks page and
// the Project Details page. Performs required-field validation.

import { useState } from 'react';

export default function TaskForm({ initialData, projects, onSave, onCancel }) {
  const [projectId, setProjectId] = useState(
    initialData?.projectId ?? (projects[0]?.id ?? ''),
  );
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [priority, setPriority] = useState(initialData?.priority ?? 'Medium');
  const [status, setStatus] = useState(initialData?.status ?? 'Pending');
  const [aiGenerated, setAiGenerated] = useState(initialData?.aiGenerated ?? false);
  const [errors, setErrors] = useState({});

  function validate() {
    const next = {};
    if (!projectId) next.projectId = 'Please select a project.';
    if (!title.trim()) next.title = 'Task title is required.';
    if (!description.trim()) next.description = 'Description is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      projectId: Number(projectId),
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      aiGenerated,
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="task-project">Select Project</label>
        <select
          id="task-project"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          aria-invalid={!!errors.projectId}
        >
          <option value="">Select a project…</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors.projectId && (
          <span className="form-error">{errors.projectId}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="task-title">Task Title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="task-description">Task Description</label>
        <textarea
          id="task-description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <span className="form-error">{errors.description}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="task-status">Status</label>
          <select
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="form-field form-field-check">
        <label htmlFor="task-ai">
          <input
            id="task-ai"
            type="checkbox"
            checked={aiGenerated}
            onChange={(e) => setAiGenerated(e.target.checked)}
          />
          AI Generated
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Task
        </button>
      </div>
    </form>
  );
}
