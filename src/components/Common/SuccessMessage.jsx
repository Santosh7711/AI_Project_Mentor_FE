// Reusable success message banner.

import { CheckCircle, X } from 'lucide-react';

export default function SuccessMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="message-banner message-success" role="status">
      <CheckCircle className="message-icon" aria-hidden="true" />
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          className="message-close"
          onClick={onClose}
          aria-label="Dismiss success message"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
