// AppLayout wraps every page with the sidebar, header, and mobile drawer.
// It also maps the current route to a human-readable page title.

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const titleMap = {
  '/': 'Dashboard',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/ai-mentor': 'AI Mentor',
  '/ai-history': 'AI History',
};

export default function AppLayout({ children, search, onSearchChange, searchPlaceholder }) {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Derive the page title from the path. Project details uses a prefix.
  let title = titleMap[location.pathname];
  if (!title) {
    if (location.pathname.startsWith('/projects/')) {
      title = 'Project Details';
    } else {
      title = 'Page Not Found';
    }
  }

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Sidebar onNavigate={() => setDrawerOpen(false)} />

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className="app-main">
        <Header
          title={title}
          onMenuClick={() => setDrawerOpen(true)}
          search={search}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
        />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
