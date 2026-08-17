// AI Mentor page: select a project, enter a requirement, choose an AI
// task type, and generate a mock structured response.
//
// In the future this page will call POST /api/ai/plan on the FastAPI
// backend. The Ollama API key stays in the backend and is never used
// from React.

import { useState } from 'react';
import { Sparkles, Save, FilePlus2, Eraser } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { aiTaskTypes } from '../data/mockData';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import SuccessMessage from '../components/Common/SuccessMessage';
import ErrorMessage from '../components/Common/ErrorMessage';
import EmptyState from '../components/Common/EmptyState';

export default function AIMentorPage() {
  const { projects, generateMockAI, saveAIInteraction, addTask } = useApp();

  const [projectId, setProjectId] = useState(projects[0]?.id ?? '');
  const [requirement, setRequirement] = useState('');
  const [aiTaskType, setAiTaskType] = useState(aiTaskTypes[0]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  function handleGenerate(e) {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!projectId) {
      setError('Please select a project.');
      return;
    }
    if (!requirement.trim()) {
      setError('Please enter a requirement or question.');
      return;
    }

    setLoading(true);
    setResponse(null);

    // Simulate the AI processing delay. The real call will go to the
    // FastAPI backend endpoint POST /api/ai/plan.
    setTimeout(() => {
      const project = projects.find((p) => p.id === Number(projectId));
      const mock = generateMockAI(project.name, requirement.trim(), aiTaskType);
      setResponse(mock);
      setLoading(false);
    }, 1400);
  }

  function handleSave() {
    if (!response) return;
    const project = projects.find((p) => p.id === Number(projectId));
    saveAIInteraction({
      projectId: Number(projectId),
      userPrompt: requirement.trim(),
      aiTaskType,
      response,
    });
    setSuccess('Recommendation saved to AI History.');
    setError('');
  }

  function handleCreateTasks() {
    if (!response) return;
    const frontendTasks = response.frontendTasks || [];
    const backendTasks = response.backendTasks || [];
    const databaseTasks = response.databaseTasks || [];

    [...frontendTasks, ...backendTasks, ...databaseTasks].forEach((title) => {
      addTask({
        projectId: Number(projectId),
        title,
        description: 'Created from AI Mentor recommendation.',
        priority: 'Medium',
        status: 'Pending',
        aiGenerated: true,
      });
    });

    setSuccess(
      `${frontendTasks.length + backendTasks.length + databaseTasks.length} tasks created from the recommendation.`,
    );
    setError('');
  }

  function handleClear() {
    setResponse(null);
    setRequirement('');
    setSuccess('');
    setError('');
  }

  return (
    <div className="page">
      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Ask the AI Mentor</h2>
        </div>
        <div className="card-body">
          <form className="form" onSubmit={handleGenerate}>
            <div className="form-field">
              <label htmlFor="ai-project">Select Project</label>
              <select
                id="ai-project"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                <option value="">Select a project…</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="ai-requirement">Requirement or Question</label>
              <textarea
                id="ai-requirement"
                rows={4}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="Describe what you want the AI mentor to help with…"
              />
            </div>

            <div className="form-field">
              <label htmlFor="ai-task-type">AI Task Type</label>
              <select
                id="ai-task-type"
                value={aiTaskType}
                onChange={(e) => setAiTaskType(e.target.value)}
              >
                {aiTaskTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-accent" disabled={loading}>
                <Sparkles size={18} aria-hidden="true" />
                Generate AI Recommendation
              </button>
            </div>
          </form>
        </div>
      </section>

      {success && <SuccessMessage message={success} onClose={() => setSuccess('')} />}
      {error && <ErrorMessage message={error} onClose={() => setError('')} />}

      {loading && (
        <section className="card">
          <div className="card-body">
            <LoadingSpinner message="AI Mentor is analysing your project…" />
          </div>
        </section>
      )}

      {!loading && response && (
        <section className="card">
          <div className="card-header">
            <h2 className="card-title">AI Recommendation</h2>
          </div>
          <div className="card-body">
            <div className="ai-response">
              <div className="ai-section">
                <h3 className="ai-section-title">Requirement Understanding</h3>
                <p>{response.understanding}</p>
              </div>

              <div className="ai-section">
                <h3 className="ai-section-title">Frontend Tasks</h3>
                <ul className="ai-list">
                  {response.frontendTasks.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>

              <div className="ai-section">
                <h3 className="ai-section-title">Backend Tasks</h3>
                <ul className="ai-list">
                  {response.backendTasks.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>

              <div className="ai-section">
                <h3 className="ai-section-title">Database Tasks</h3>
                <ul className="ai-list">
                  {response.databaseTasks.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>

              <div className="ai-section">
                <h3 className="ai-section-title">Testing Steps</h3>
                <ul className="ai-list">
                  {response.testingSteps.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>

              <div className="ai-section">
                <h3 className="ai-section-title">Possible Blockers</h3>
                <ul className="ai-list">
                  {response.possibleBlockers.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>

              <div className="ai-section ai-section-highlight">
                <h3 className="ai-section-title">Recommended Next Action</h3>
                <p>{response.recommendedNextAction}</p>
              </div>
            </div>

            <div className="ai-actions">
              <button type="button" className="btn btn-secondary" onClick={handleSave}>
                <Save size={18} aria-hidden="true" />
                Save Recommendation
              </button>
              <button type="button" className="btn btn-primary" onClick={handleCreateTasks}>
                <FilePlus2 size={18} aria-hidden="true" />
                Create Tasks from Recommendation
              </button>
              <button type="button" className="btn btn-ghost" onClick={handleClear}>
                <Eraser size={18} aria-hidden="true" />
                Clear Response
              </button>
            </div>
          </div>
        </section>
      )}

      {!loading && !response && !error && (
        <EmptyState
          title="No recommendation yet"
          message="Select a project, describe your requirement, and generate an AI recommendation."
          icon={Sparkles}
        />
      )}
    </div>
  );
}
