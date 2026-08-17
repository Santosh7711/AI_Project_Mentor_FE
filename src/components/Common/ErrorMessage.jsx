// Reusable error message banner.

import { AlertCircle, X } from 'lucide-react';

export default function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="message-banner message-error" role="alert">
      <AlertCircle className="message-icon" aria-hidden="true" />
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          className="message-close"
          onClick={onClose}
          aria-label="Dismiss error message"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
