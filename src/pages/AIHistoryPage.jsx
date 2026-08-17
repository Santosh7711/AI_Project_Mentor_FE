// AI History page: lists previous AI interactions with filters and a
// modal to view the full structured response.

import { useState } from 'react';
import { History, Eye, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Common/Modal';
import ConfirmDialog from '../components/Common/ConfirmDialog';
import EmptyState from '../components/Common/EmptyState';
import Badge from '../components/Common/Badge';

export default function AIHistoryPage() {
  const { projects, aiHistory, deleteAIInteraction } = useApp();
  const [viewTarget, setViewTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [filterProject, setFilterProject] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const projectName = (projectId) =>
    projects.find((p) => p.id === projectId)?.name ?? 'Unknown';

  const filtered = aiHistory.filter((item) => {
    if (filterProject && item.projectId !== Number(filterProject)) return false;
    if (filterType && item.aiTaskType !== filterType) return false;
    if (filterDate && item.createdAt !== filterDate) return false;
    return true;
  });

  function confirmDelete() {
    if (deleteTarget) {
      deleteAIInteraction(deleteTarget.id);
      setDeleteTarget(null);
    }
  }

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
            aria-label="Filter by AI task type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All AI Task Types</option>
            {[
              'Generate Project Plan',
              'Break Requirement into Tasks',
              'Recommend Next Task',
              'Identify Project Blockers',
              'Explain Implementation',
              'Generate Testing Checklist',
            ].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <input
            type="date"
            aria-label="Filter by date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No AI interactions found"
          message="Generate a recommendation on the AI Mentor page to see it here."
          icon={History}
        />
      ) : (
        <div className="card">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project</th>
                  <th>Prompt</th>
                  <th>Response Preview</th>
                  <th>Model</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td className="task-id-cell">#{item.id}</td>
                    <td>{projectName(item.projectId)}</td>
                    <td>
                      <div className="prompt-cell">{item.userPrompt}</div>
                    </td>
                    <td>
                      <div className="preview-cell">
                        {item.response.recommendedNextAction}
                      </div>
                    </td>
                    <td>
                      <Badge label={item.modelName} variant="indigo" />
                    </td>
                    <td>{item.createdAt}</td>
                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          aria-label="View complete response"
                          onClick={() => setViewTarget(item)}
                        >
                          <Eye size={16} aria-hidden="true" />
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          aria-label="Delete history"
                          onClick={() => setDeleteTarget(item)}
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

      {viewTarget && (
        <Modal
          title={`AI Interaction #${viewTarget.id}`}
          onClose={() => setViewTarget(null)}
        >
          <div className="ai-response">
            <div className="ai-section">
              <span className="meta-label">Project</span>
              <p>{projectName(viewTarget.projectId)}</p>
            </div>
            <div className="ai-section">
              <span className="meta-label">Prompt</span>
              <p>{viewTarget.userPrompt}</p>
            </div>
            <div className="ai-section">
              <span className="meta-label">Task Type</span>
              <p>{viewTarget.aiTaskType}</p>
            </div>
            <div className="ai-section">
              <h3 className="ai-section-title">Requirement Understanding</h3>
              <p>{viewTarget.response.understanding}</p>
            </div>
            <div className="ai-section">
              <h3 className="ai-section-title">Frontend Tasks</h3>
              <ul className="ai-list">
                {viewTarget.response.frontendTasks.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div className="ai-section">
              <h3 className="ai-section-title">Backend Tasks</h3>
              <ul className="ai-list">
                {viewTarget.response.backendTasks.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div className="ai-section">
              <h3 className="ai-section-title">Database Tasks</h3>
              <ul className="ai-list">
                {viewTarget.response.databaseTasks.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div className="ai-section">
              <h3 className="ai-section-title">Testing Steps</h3>
              <ul className="ai-list">
                {viewTarget.response.testingSteps.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div className="ai-section">
              <h3 className="ai-section-title">Possible Blockers</h3>
              <ul className="ai-list">
                {viewTarget.response.possibleBlockers.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div className="ai-section ai-section-highlight">
              <h3 className="ai-section-title">Recommended Next Action</h3>
              <p>{viewTarget.response.recommendedNextAction}</p>
            </div>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete AI History"
          message={`Are you sure you want to delete interaction #${deleteTarget.id}?`}
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
