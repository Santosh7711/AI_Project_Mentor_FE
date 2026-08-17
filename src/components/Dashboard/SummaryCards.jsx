// Summary cards for the dashboard: total projects, total tasks, and
// counts by status.

import { FolderKanban, ListTodo, Clock, Loader, CheckCircle2 } from 'lucide-react';

export default function SummaryCards({ projects, tasks }) {
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;

  const cards = [
    { label: 'Total Projects', value: totalProjects, icon: FolderKanban, color: 'blue' },
    { label: 'Total Tasks', value: totalTasks, icon: ListTodo, color: 'indigo' },
    { label: 'Pending Tasks', value: pendingTasks, icon: Clock, color: 'cyan' },
    { label: 'In Progress', value: inProgressTasks, icon: Loader, color: 'amber' },
    { label: 'Completed Tasks', value: completedTasks, icon: CheckCircle2, color: 'green' },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className={`summary-card summary-card-${card.color}`}>
            <div className="summary-card-icon">
              <Icon aria-hidden="true" />
            </div>
            <div className="summary-card-body">
              <span className="summary-card-value">{card.value}</span>
              <span className="summary-card-label">{card.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
