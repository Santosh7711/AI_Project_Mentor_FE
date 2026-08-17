// AI Recommended Next Task section on the dashboard.

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecommendedNextTask({ projects, tasks }) {
  // Pick the first in-progress task across all projects as the recommendation.
  const inProgress = tasks.find((t) => t.status === 'In Progress');
  const project = inProgress
    ? projects.find((p) => p.id === inProgress.projectId)
    : null;

  const recommended = inProgress && project
    ? {
        projectName: project.name,
        taskTitle: inProgress.title,
        reason:
          'This task is already in progress and unblocks other pending work. Finishing it first will move the project forward the most.',
        projectId: project.id,
      }
    : null;

  return (
    <section className="card recommended-card">
      <div className="card-header">
        <h2 className="card-title">AI Recommended Next Task</h2>
      </div>
      <div className="card-body">
        {recommended ? (
          <div className="recommended-content">
            <div className="recommended-row">
              <span className="recommended-label">Project:</span>
              <span>{recommended.projectName}</span>
            </div>
            <div className="recommended-row">
              <span className="recommended-label">Recommended task:</span>
              <span>{recommended.taskTitle}</span>
            </div>
            <div className="recommended-row">
              <span className="recommended-label">Reason:</span>
              <span>{recommended.reason}</span>
            </div>
            <Link to="/ai-mentor" className="btn btn-primary btn-sm">
              View Recommendation
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <p className="recommended-empty">
            No in-progress task found. Start a task to get a recommendation.
          </p>
        )}
      </div>
    </section>
  );
}
