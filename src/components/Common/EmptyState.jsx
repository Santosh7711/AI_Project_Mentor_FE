// Empty state shown when a list or section has no data.

import { Inbox } from 'lucide-react';

export default function EmptyState({ title, message, icon: Icon = Inbox, action }) {
  return (
    <div className="empty-state">
      <Icon className="empty-state-icon" aria-hidden="true" />
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-message">{message}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}
