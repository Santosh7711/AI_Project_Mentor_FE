# AI Project Mentor

## Application objective

AI Project Mentor is a beginner-friendly full-stack training application where users can:

- Create and manage software projects.
- Add development tasks to a project.
- Update task priorities and statuses.
- View project progress through a dashboard.
- Ask an AI mentor to break requirements into development tasks.
- View previous AI interactions.

This repository currently contains the **frontend application** only. It runs entirely on mock data and does not require a backend or database.

## Technology stack

### Current (frontend)

- HTML5 for page structure
- CSS3 for design, layout, and responsiveness
- JavaScript ES6+ for application logic
- React.js for reusable UI components
- Vite as the React build tool
- React Router DOM for navigation
- Axios for future backend API communication
- Lucide React for icons

### Planned (backend)

- Python
- FastAPI REST APIs
- SQL Server database
- Ollama Cloud API using a GPT-OSS model

## Current frontend features

- Responsive sidebar navigation on desktop with a collapsible mobile drawer
- Clean top header with page title, search box, notification icon, and profile placeholder
- Dashboard with summary cards, project progress bars, recent tasks table, and AI recommended next task
- Projects page with cards, create/edit modal form, and delete confirmation
- Project Details page with full project info, progress bar, and task list
- Tasks page with filterable, searchable table, status change dropdown, and add/edit/delete actions
- AI Mentor page with project selection, requirement input, task type selector, and structured mock AI response
- AI History page with filters and full response viewer
- Not Found page for unknown routes
- Reusable UI components: LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState, ConfirmDialog, Modal, Badge
- Form validation with inline error messages
- Status and priority badges with colour coding
- Mock data for 3 projects, 10 tasks, and 4 AI interactions

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Folder structure

```
src/
  components/
    Layout/
      AppLayout.jsx      # Shared layout: sidebar + header + content
      Sidebar.jsx        # Desktop sidebar navigation
      Header.jsx         # Top header with search and profile
    Dashboard/
      SummaryCards.jsx   # Dashboard summary stat cards
      ProjectProgress.jsx # Project progress bars
      RecentTasks.jsx    # Recent tasks table
      RecommendedNextTask.jsx # AI recommendation card
    Projects/
      ProjectForm.jsx    # Create/edit project form with validation
    Tasks/
      TaskForm.jsx       # Create/edit task form with validation
    AI/
      (AI components are rendered directly in AIMentorPage)
    Common/
      Badge.jsx          # Status and priority badges
      ConfirmDialog.jsx  # Confirmation dialog for delete actions
      EmptyState.jsx     # Empty state placeholder
      ErrorMessage.jsx   # Error message banner
      LoadingSpinner.jsx # Loading indicator
      Modal.jsx          # Reusable modal wrapper
      SuccessMessage.jsx # Success message banner
  context/
    AppContext.jsx       # Shared state for projects, tasks, and AI history
  pages/
    DashboardPage.jsx
    ProjectsPage.jsx
    ProjectDetailsPage.jsx
    TasksPage.jsx
    AIMentorPage.jsx
    AIHistoryPage.jsx
    NotFoundPage.jsx
  services/
    api.js               # Axios API functions for future FastAPI backend
  data/
    mockData.js          # Mock projects, tasks, and AI interactions
  styles/
    global.css           # Global styles and design system
  App.jsx                # Router and route configuration
  main.jsx               # React entry point
```

## Environment variables

Copy `.env.example` to `.env` and adjust if needed:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_USE_MOCK_DATA=true
```

- `VITE_API_BASE_URL` — Base URL of the future FastAPI backend. Default is the local development server.
- `VITE_USE_MOCK_DATA` — When `true`, the app uses mock data instead of calling the backend.

**Important:** Never add `OLLAMA_API_KEY`, database credentials, or SQL Server connection strings to the frontend `.env` file. These values belong only in the Python backend.

## Future FastAPI integration

The frontend is prepared to consume the following FastAPI endpoints once the backend is ready:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Backend health check |
| GET | `/api/dashboard` | Dashboard statistics |
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create a project |
| GET | `/api/projects/{project_id}` | Get one project |
| PUT | `/api/projects/{project_id}` | Update a project |
| DELETE | `/api/projects/{project_id}` | Delete a project |
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/{task_id}` | Get one task |
| PUT | `/api/tasks/{task_id}` | Update a task |
| PATCH | `/api/tasks/{task_id}/status` | Change task status |
| DELETE | `/api/tasks/{task_id}` | Delete a task |
| POST | `/api/ai/plan` | Generate AI recommendation |
| POST | `/api/ai/next-task` | Recommend next task |
| GET | `/api/ai/history/{project_id}` | Get AI interactions for a project |

### How to switch from mock data to real API calls

1. Set `VITE_USE_MOCK_DATA=false` in `.env`.
2. In `src/context/AppContext.jsx`, replace the mock data initialisation and mutation functions with calls from `src/services/api.js`.
3. The API service file (`src/services/api.js`) already contains all the reusable Axios functions needed.
4. The Ollama API key must remain in the Python backend and must never be used from React.
