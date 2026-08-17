// Recent Tasks table for the dashboard.

import Badge from '../Common/Badge';

export default function RecentTasks({ tasks, projects }) {
  const sorted = [...tasks].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );
  const recent = sorted.slice(0, 5);

  const projectName = (projectId) =>
    projects.find((p) => p.id === projectId)?.name ?? 'Unknown';

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
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">Recent Tasks</h2>
      </div>
      <div className="card-body">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Project</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{projectName(task.projectId)}</td>
                  <td>
                    <Badge label={task.priority} variant={priorityVariant(task.priority)} />
                  </td>
                  <td>
                    <Badge label={task.status} variant={statusVariant(task.status)} />
                  </td>
                  <td>{task.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
