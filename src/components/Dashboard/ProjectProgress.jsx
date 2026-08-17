// Project Progress section: shows each project with its tech stack,
// task count, completed percentage, and a progress bar.

export default function ProjectProgress({ projects, tasks }) {
  return (
    <section className="card">
      <div className="card-header">
        <h2 className="card-title">Project Progress</h2>
      </div>
      <div className="card-body">
        {projects.map((project) => {
          const projectTasks = tasks.filter((t) => t.projectId === project.id);
          const total = projectTasks.length;
          const completed = projectTasks.filter((t) => t.status === 'Completed').length;
          const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

          return (
            <div key={project.id} className="progress-row">
              <div className="progress-row-top">
                <span className="progress-row-name">{project.name}</span>
                <span className="progress-row-percent">{percent}%</span>
              </div>
              <div className="progress-row-tech">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
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
              <span className="progress-row-meta">
                {completed} of {total} tasks completed
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
