// Dashboard page: summary cards, project progress, recent tasks, and
// the AI recommended next task.

import { useApp } from '../context/AppContext';
import SummaryCards from '../components/Dashboard/SummaryCards';
import ProjectProgress from '../components/Dashboard/ProjectProgress';
import RecentTasks from '../components/Dashboard/RecentTasks';
import RecommendedNextTask from '../components/Dashboard/RecommendedNextTask';

export default function DashboardPage() {
  const { projects, tasks } = useApp();

  return (
    <div className="page">
      <SummaryCards projects={projects} tasks={tasks} />
      <div className="dashboard-grid">
        <ProjectProgress projects={projects} tasks={tasks} />
        <RecommendedNextTask projects={projects} tasks={tasks} />
      </div>
      <RecentTasks tasks={tasks} projects={projects} />
    </div>
  );
}
