import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, Bell, PenSquare, ChevronDown, LogOut, User, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function UserAvatar({ user, size = 'md' }) {
  const sizeClasses = size === 'sm'
    ? 'h-7 w-7 text-[11px]'
    : 'h-8 w-8 text-xs';

  if (user?.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.username}
        className={`${sizeClasses} rounded-full object-cover ring-2 ring-white`}
      />
    );
  }

  // Initials-based fallback
  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : '??';

  return (
    <div className={`${sizeClasses} flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 font-bold text-white ring-2 ring-white`}>
      {initials}
    </div>
  );
}

function AvatarDropdown({ user, logout, onClose }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5 z-50">
      {/* User info header */}
      <div className="flex items-center gap-3 border-b border-slate-100 p-3.5">
        <UserAvatar user={user} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-slate-900">{user.username}</p>
          <p className="truncate text-[11px] text-slate-400">{user.email}</p>
        </div>
      </div>

      {/* Nav items */}
      <div className="p-1.5">
        <Link
          to={`/u/${user.username}`}
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <User size={14} className="text-slate-400" />
          My Profile
        </Link>
        <Link
          to="/me/stories"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <BookOpen size={14} className="text-slate-400" />
          My Stories
        </Link>
      </div>

      {/* Logout */}
      <div className="border-t border-slate-100 p-1.5">
        <button
          onClick={() => { logout(); onClose(); }}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export function Navbar({ onToggleSidebar }) {
  const { openAuthModal, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="flex h-14 w-full max-w-[1600px] mx-auto items-center justify-between px-3 lg:px-6">

        {/* LEFT: Hamburger + SVG Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            title="Toggle Sidebar"
          >
            <div className="flex flex-col gap-1">
              <span className="block h-0.5 w-4 bg-current rounded-full"></span>
              <span className="block h-0.5 w-4 bg-current rounded-full"></span>
              <span className="block h-0.5 w-4 bg-current rounded-full"></span>
            </div>
          </button>

          <Link to="/" className="flex items-center gap-2.5 text-slate-900 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <svg className="h-4.5 w-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h10a4 4 0 0 1 4 4 4 4 0 0 1-4 4H4z" />
                <path d="M4 12h11a4 4 0 0 1 4 4 4 4 0 0 1-4 4H4z" />
              </svg>
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">
              Byte<span className="text-indigo-600">Blog</span>
            </span>
          </Link>
        </div>

        {/* CENTER: Search */}
        <div className="mx-4 flex w-full max-w-xl items-center">
          <div className="relative w-full">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles, tags, authors..."
              className="h-9 w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-10 text-xs text-slate-900 placeholder:text-slate-400 hover:bg-white focus:border-indigo-500 focus:bg-white focus:outline-none transition-all shadow-inner"
            />
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 shadow-xs">
              /
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex shrink-0 items-center gap-1.5">
          {user ? (
            <>
              {/* Write Post button */}
              <Link
                to="/new-post"
                className="hidden sm:flex h-8 items-center gap-1.5 rounded-full bg-indigo-600 px-4 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm transition-colors"
              >
                <PenSquare size={13} />
                Write Post
              </Link>

              {/* Notification Bell */}
              <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
                <Bell size={18} />
                {/* Unread indicator dot */}
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {/* Avatar + Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-1 rounded-full p-0.5 hover:ring-2 hover:ring-indigo-200 transition-all"
                >
                  <UserAvatar user={user} />
                  <ChevronDown
                    size={13}
                    className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {dropdownOpen && (
                  <AvatarDropdown
                    user={user}
                    logout={logout}
                    onClose={() => setDropdownOpen(false)}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={openAuthModal}
                className="flex h-8 items-center rounded-full px-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={openAuthModal}
                className="flex h-8 items-center rounded-full bg-indigo-600 px-4 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
