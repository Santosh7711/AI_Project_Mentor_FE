// A simple loading spinner with an optional message.

import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading…' }) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <Loader2 className="spinner-icon" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
