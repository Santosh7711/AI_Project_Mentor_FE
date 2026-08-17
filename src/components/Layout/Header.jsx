// Top header bar: page title, search box, notification icon, profile, and
// the mobile menu button.

import { Bell, Menu, Search, UserCircle } from 'lucide-react';

export default function Header({ title, onMenuClick, search, onSearchChange, searchPlaceholder = 'Search…' }) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          type="button"
          className="header-menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-right">
        <div className="header-search">
          <Search className="header-search-icon" aria-hidden="true" />
          <input
            type="search"
            className="header-search-input"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label={searchPlaceholder}
          />
        </div>
        <button type="button" className="header-icon-btn" aria-label="Notifications">
          <Bell size={20} aria-hidden="true" />
          <span className="header-icon-badge" aria-hidden="true">3</span>
        </button>
        <div className="header-profile" title="Demo user">
          <UserCircle size={28} aria-hidden="true" />
          <span className="header-profile-name">Demo User</span>
        </div>
      </div>
    </header>
  );
}
