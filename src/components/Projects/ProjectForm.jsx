// Reusable Create/Edit Project form. Used inside a modal on the
// Projects page. Performs required-field validation.

import { useState } from 'react';

export default function ProjectForm({ initialData, onSave, onCancel }) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [techStack, setTechStack] = useState(
    initialData?.techStack?.join(', ') ?? '',
  );
  const [errors, setErrors] = useState({});

  function validate() {
    const next = {};
    if (!name.trim()) next.name = 'Project name is required.';
    if (!description.trim()) next.description = 'Description is required.';
    if (!techStack.trim()) next.techStack = 'Technology stack is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      name: name.trim(),
      description: description.trim(),
      techStack: techStack.split(',').map((t) => t.trim()).filter(Boolean),
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="project-name">Project Name</label>
        <input
          id="project-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="project-description">Project Description</label>
        <textarea
          id="project-description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <span className="form-error">{errors.description}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="project-tech">Technology Stack</label>
        <input
          id="project-tech"
          type="text"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="React, FastAPI, SQL Server"
          aria-invalid={!!errors.techStack}
        />
        {errors.techStack && (
          <span className="form-error">{errors.techStack}</span>
        )}
        <span className="form-hint">Separate technologies with commas.</span>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Project
        </button>
      </div>
    </form>
  );
}
