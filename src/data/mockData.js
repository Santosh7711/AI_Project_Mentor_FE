// Mock data for the AI Project Mentor frontend.
// This data is used while the Python/FastAPI backend is not yet connected.
// When the backend is ready, replace the mock data with real API calls
// using the functions in src/services/api.js.

// Three example software projects
export const mockProjects = [
  {
    id: 1,
    name: 'Student Placement Portal',
    description:
      'A web portal where students can register, upload resumes, and apply for campus placement drives. Admins can post job openings and shortlist candidates.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'Ollama'],
    createdAt: '2026-07-02',
  },
  {
    id: 2,
    name: 'Hospital Appointment System',
    description:
      'A booking system for outpatient appointments. Patients can book slots, doctors can approve or reschedule, and reception can manage daily queues.',
    techStack: ['React', 'FastAPI', 'SQL Server'],
    createdAt: '2026-07-18',
  },
  {
    id: 3,
    name: 'AI Resume Mentor',
    description:
      'An AI-powered resume review tool. Users upload a resume, the AI suggests improvements, and users can download an optimised version.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'GPT-OSS'],
    createdAt: '2026-08-01',
  },
];

// Ten development tasks spread across the three projects
export const mockTasks = [
  {
    id: 1,
    projectId: 1,
    title: 'Design student registration form',
    description: 'Create a responsive registration form with validation for name, email, and course.',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-03',
    updatedAt: '2026-07-05',
  },
  {
    id: 2,
    projectId: 1,
    title: 'Build resume upload component',
    description: 'Allow students to upload a PDF resume and show a preview before submitting.',
    priority: 'Medium',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-06',
    updatedAt: '2026-07-09',
  },
  {
    id: 3,
    projectId: 1,
    title: 'Create admin job posting screen',
    description: 'Admins should be able to add a job opening with title, description, and eligibility.',
    priority: 'High',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-08',
    updatedAt: '2026-07-08',
  },
  {
    id: 4,
    projectId: 1,
    title: 'Generate AI shortlisting suggestions',
    description: 'Use the AI mentor to suggest which candidates match a job opening based on resume content.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-07-10',
    updatedAt: '2026-07-10',
  },
  {
    id: 5,
    projectId: 2,
    title: 'Design doctor availability calendar',
    description: 'Show available appointment slots per doctor in a weekly calendar view.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-20',
    updatedAt: '2026-07-22',
  },
  {
    id: 6,
    projectId: 2,
    title: 'Build patient booking flow',
    description: 'Multi-step booking flow: select doctor, pick slot, confirm details, and receive confirmation.',
    priority: 'High',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-21',
    updatedAt: '2026-07-21',
  },
  {
    id: 7,
    projectId: 2,
    title: 'Create reception queue dashboard',
    description: 'A daily view for reception staff showing approved appointments and walk-in queue.',
    priority: 'Low',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-23',
    updatedAt: '2026-07-23',
  },
  {
    id: 8,
    projectId: 3,
    title: 'Build resume upload and parser',
    description: 'Upload a resume PDF and extract text content for AI review.',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-08-02',
    updatedAt: '2026-08-04',
  },
  {
    id: 9,
    projectId: 3,
    title: 'Integrate AI resume feedback',
    description: 'Send extracted resume text to the AI mentor and display structured improvement suggestions.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: true,
    createdAt: '2026-08-05',
    updatedAt: '2026-08-06',
  },
  {
    id: 10,
    projectId: 3,
    title: 'Add optimised resume download',
    description: 'Allow the user to download the AI-improved resume as a PDF.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-08-07',
    updatedAt: '2026-08-07',
  },
];

// Four previous AI interactions
export const mockAIHistory = [
  {
    id: 1,
    projectId: 1,
    userPrompt:
      'Break down the student placement portal into frontend, backend, and database tasks for the first release.',
    aiTaskType: 'Break Requirement into Tasks',
    modelName: 'GPT-OSS',
    createdAt: '2026-07-04',
    response: {
      understanding:
        'The student placement portal needs registration, resume upload, job postings, and shortlisting for the first release.',
      frontendTasks: [
        'Registration form with validation',
        'Resume upload and preview',
        'Admin job posting screen',
        'Candidate shortlist view',
      ],
      backendTasks: [
        'Student registration API',
        'Resume upload API with file storage',
        'Job posting CRUD API',
        'Shortlisting API with AI suggestions',
      ],
      databaseTasks: [
        'Students table',
        'Resumes table',
        'Job postings table',
        'Applications table',
      ],
      testingSteps: [
        'Test registration validation',
        'Test resume upload size limits',
        'Test job posting creation',
        'Test shortlist flow end to end',
      ],
      possibleBlockers: [
        'Resume file size limits may need tuning',
        'AI shortlisting accuracy depends on resume quality',
      ],
      recommendedNextAction:
        'Start with the student registration form and backend API together, then move to resume upload.',
    },
  },
  {
    id: 2,
    projectId: 2,
    userPrompt:
      'Recommend the next task I should work on for the hospital appointment system.',
    aiTaskType: 'Recommend Next Task',
    modelName: 'GPT-OSS',
    createdAt: '2026-07-22',
    response: {
      understanding:
        'The hospital appointment system needs a booking flow, but the doctor availability calendar is still in progress.',
      frontendTasks: [
        'Finish doctor availability calendar',
        'Start patient booking flow',
      ],
      backendTasks: [
        'Doctor availability API',
        'Appointment booking API',
      ],
      databaseTasks: [
        'Doctors table',
        'Appointments table',
        'Availability slots table',
      ],
      testingSteps: [
        'Test slot selection',
        'Test double-booking prevention',
      ],
      possibleBlockers: [
        'Time zone handling between doctors and patients',
      ],
      recommendedNextAction:
        'Complete the doctor availability calendar first because the booking flow depends on it.',
    },
  },
  {
    id: 3,
    projectId: 3,
    userPrompt:
      'Explain how to implement the AI resume feedback feature using the GPT-OSS model.',
    aiTaskType: 'Explain Implementation',
    modelName: 'GPT-OSS',
    createdAt: '2026-08-06',
    response: {
      understanding:
        'The AI resume feedback feature sends parsed resume text to the GPT-OSS model and shows structured suggestions.',
      frontendTasks: [
        'Resume text preview component',
        'Structured feedback display',
      ],
      backendTasks: [
        'FastAPI endpoint POST /api/ai/plan',
        'Prompt template for resume review',
        'Response parser for structured sections',
      ],
      databaseTasks: [
        'AI interactions table for history',
      ],
      testingSteps: [
        'Test with sample resumes',
        'Test long resume handling',
        'Test error responses from the AI service',
      ],
      possibleBlockers: [
        'AI response latency on long resumes',
        'Token limits for large inputs',
      ],
      recommendedNextAction:
        'Create the FastAPI endpoint and a simple prompt template, then test with one sample resume.',
    },
  },
  {
    id: 4,
    projectId: 1,
    userPrompt:
      'Identify possible blockers for the student placement portal before the first demo.',
    aiTaskType: 'Identify Project Blockers',
    modelName: 'GPT-OSS',
    createdAt: '2026-08-10',
    response: {
      understanding:
        'The first demo of the placement portal should show registration, resume upload, and job posting.',
      frontendTasks: [
        'Polish registration form styling',
        'Add loading indicators on upload',
      ],
      backendTasks: [
        'Verify resume upload file storage',
        'Confirm job posting API responses',
      ],
      databaseTasks: [
        'Check foreign key constraints',
        'Seed demo data',
      ],
      testingSteps: [
        'Run a full registration to job posting flow',
        'Test on mobile viewport',
      ],
      possibleBlockers: [
        'Resume storage may not be ready for the demo',
        'AI shortlisting may return inconsistent results',
      ],
      recommendedNextAction:
        'Prepare a small set of demo students and one job posting so the demo flow is predictable.',
    },
  },
];

// Helper to produce a mock AI response for the AI Mentor page.
// In the future this will be replaced by a call to POST /api/ai/plan.
export function buildMockAIResponse(projectName, requirement, aiTaskType) {
  return {
    understanding: `You asked the AI mentor to "${aiTaskType}" for the project "${projectName}". The requirement is: ${requirement}`,
    frontendTasks: [
      'Create a responsive page for this feature',
      'Add a form with validation and loading states',
      'Show success and error messages to the user',
    ],
    backendTasks: [
      'Add a FastAPI endpoint for this feature',
      'Validate input on the server side',
      'Return clear error messages for invalid input',
    ],
    databaseTasks: [
      'Create or update the required table',
      'Add foreign key relationships to related tables',
      'Write a migration script for the change',
    ],
    testingSteps: [
      'Test the happy path end to end',
      'Test validation errors for empty input',
      'Test the feature on mobile and desktop views',
    ],
    possibleBlockers: [
      'Backend endpoint may not be ready yet',
      'Database schema may need a migration',
    ],
    recommendedNextAction:
      'Start with the backend endpoint and a simple frontend form, then connect them together.',
  };
}

// AI task type options used on the AI Mentor page
export const aiTaskTypes = [
  'Generate Project Plan',
  'Break Requirement into Tasks',
  'Recommend Next Task',
  'Identify Project Blockers',
  'Explain Implementation',
  'Generate Testing Checklist',
];
