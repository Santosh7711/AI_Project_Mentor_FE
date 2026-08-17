// Sidebar navigation for desktop. On mobile it is shown as a slide-in
// drawer controlled by the AppLayout.

import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, ListTodo, Sparkles, History, BrainCircuit } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/ai-mentor', label: 'AI Mentor', icon: Sparkles },
  { to: '/ai-history', label: 'AI History', icon: History },
];

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <BrainCircuit className="sidebar-brand-icon" aria-hidden="true" />
        <span className="sidebar-brand-text">AI Project Mentor</span>
      </div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
              }
              onClick={onNavigate}
            >
              <Icon className="sidebar-link-icon" aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <p>Frontend demo with mock data</p>
      </div>
    </aside>
  );
}
