// AppContext provides shared state for projects, tasks, and AI history.
// All create/edit/delete operations work on local state so the frontend
// runs without a backend. When the FastAPI backend is ready, replace the
// mock arrays and the mutation functions with calls to src/services/api.js.

import { createContext, useContext, useMemo, useState } from 'react';
import {
  mockProjects,
  mockTasks,
  mockAIHistory,
  buildMockAIResponse,
} from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [projects, setProjects] = useState(mockProjects);
  const [tasks, setTasks] = useState(mockTasks);
  const [aiHistory, setAiHistory] = useState(mockAIHistory);

  // --- Project helpers ---

  function addProject(projectData) {
    const newProject = {
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
      ...projectData,
    };
    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  }

  function updateProject(projectId, projectData) {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...projectData } : p)),
    );
  }

  function deleteProject(projectId) {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    // Remove tasks that belonged to the deleted project
    setTasks((prev) => prev.filter((t) => t.projectId !== projectId));
  }

  // --- Task helpers ---

  function addTask(taskData) {
    const now = new Date().toISOString().slice(0, 10);
    const newTask = {
      id: Date.now(),
      createdAt: now,
      updatedAt: now,
      aiGenerated: false,
      ...taskData,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }

  function updateTask(taskId, taskData) {
    const now = new Date().toISOString().slice(0, 10);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, ...taskData, updatedAt: now } : t,
      ),
    );
  }

  function updateTaskStatus(taskId, status) {
    const now = new Date().toISOString().slice(0, 10);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status, updatedAt: now } : t,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  // --- AI helpers ---

  function generateMockAI(projectName, requirement, aiTaskType) {
    // Returns a structured mock response after a short delay is handled
    // by the caller. The response is built from mockData.js.
    return buildMockAIResponse(projectName, requirement, aiTaskType);
  }

  function saveAIInteraction(interaction) {
    const newInteraction = {
      id: Date.now(),
      modelName: 'GPT-OSS',
      createdAt: new Date().toISOString().slice(0, 10),
      ...interaction,
    };
    setAiHistory((prev) => [newInteraction, ...prev]);
    return newInteraction;
  }

  function deleteAIInteraction(interactionId) {
    setAiHistory((prev) => prev.filter((i) => i.id !== interactionId));
  }

  // Convenience derived value used by several pages
  function tasksForProject(projectId) {
    return tasks.filter((t) => t.projectId === projectId);
  }

  const value = useMemo(
    () => ({
      projects,
      tasks,
      aiHistory,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      updateTaskStatus,
      deleteTask,
      generateMockAI,
      saveAIInteraction,
      deleteAIInteraction,
      tasksForProject,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects, tasks, aiHistory],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook so components can access the shared state
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
