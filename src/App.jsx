import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/Layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import TasksPage from './pages/TasksPage';
import AIMentorPage from './pages/AIMentorPage';
import AIHistoryPage from './pages/AIHistoryPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  // Shared search state passed to the layout header. Each page reads it
  // through props to filter its content.
  const [search, setSearch] = useState('');

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout search={search} onSearchChange={setSearch} searchPlaceholder="Search…">
                <DashboardPage />
              </AppLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <AppLayout search={search} onSearchChange={setSearch} searchPlaceholder="Search projects…">
                <ProjectsPage search={search} />
              </AppLayout>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <AppLayout search={search} onSearchChange={setSearch} searchPlaceholder="Search…">
                <ProjectDetailsPage />
              </AppLayout>
            }
          />
          <Route
            path="/tasks"
            element={
              <AppLayout search={search} onSearchChange={setSearch} searchPlaceholder="Search tasks…">
                <TasksPage search={search} />
              </AppLayout>
            }
          />
          <Route
            path="/ai-mentor"
            element={
              <AppLayout search={search} onSearchChange={setSearch} searchPlaceholder="Search…">
                <AIMentorPage />
              </AppLayout>
            }
          />
          <Route
            path="/ai-history"
            element={
              <AppLayout search={search} onSearchChange={setSearch} searchPlaceholder="Search history…">
                <AIHistoryPage />
              </AppLayout>
            }
          />
          <Route
            path="*"
            element={
              <AppLayout search={search} onSearchChange={setSearch} searchPlaceholder="Search…">
                <NotFoundPage />
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
