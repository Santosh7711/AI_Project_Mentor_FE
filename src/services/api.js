// Axios-based API service for the AI Project Mentor frontend.
//
// This file prepares the HTTP calls that will later be sent to the
// Python/FastAPI backend. While the backend is not yet available, the
// application uses mock data (see src/data/mockData.js) instead of
// calling these functions.
//
// Base URL is read from the VITE_API_BASE_URL environment variable.
// Default development URL: http://127.0.0.1:8000

import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

// Shared axios instance so every request uses the same base URL and headers.
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Project endpoints ---

export async function getProjects() {
  const response = await apiClient.get('/api/projects');
  return response.data;
}

export async function getProjectById(projectId) {
  const response = await apiClient.get(`/api/projects/${projectId}`);
  return response.data;
}

export async function createProject(projectData) {
  const response = await apiClient.post('/api/projects', projectData);
  return response.data;
}

export async function updateProject(projectId, projectData) {
  const response = await apiClient.put(`/api/projects/${projectId}`, projectData);
  return response.data;
}

export async function deleteProject(projectId) {
  const response = await apiClient.delete(`/api/projects/${projectId}`);
  return response.data;
}

// --- Task endpoints ---

export async function getTasks() {
  const response = await apiClient.get('/api/tasks');
  return response.data;
}

export async function createTask(taskData) {
  const response = await apiClient.post('/api/tasks', taskData);
  return response.data;
}

export async function updateTask(taskId, taskData) {
  const response = await apiClient.put(`/api/tasks/${taskId}`, taskData);
  return response.data;
}

export async function updateTaskStatus(taskId, status) {
  const response = await apiClient.patch(`/api/tasks/${taskId}/status`, { status });
  return response.data;
}

export async function deleteTask(taskId) {
  const response = await apiClient.delete(`/api/tasks/${taskId}`);
  return response.data;
}

// --- AI endpoints ---

export async function generateAIPlan(requestData) {
  const response = await apiClient.post('/api/ai/plan', requestData);
  return response.data;
}

export async function getAIHistory(projectId) {
  const response = await apiClient.get(`/api/ai/history/${projectId}`);
  return response.data;
}

// --- Dashboard and health endpoints ---

export async function getDashboardStatistics() {
  const response = await apiClient.get('/api/dashboard');
  return response.data;
}

export async function checkBackendHealth() {
  const response = await apiClient.get('/api/health');
  return response.data;
}

export default apiClient;
