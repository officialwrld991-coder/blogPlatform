import { Link, useLocation } from 'react-router';
import { Mail, Home, Flame, Hash, Bookmark, BookOpen, PenSquare } from 'lucide-react';
import { FaGoogle, FaApple } from 'react-icons/fa6';
import { useAuth } from '../../context/AuthContext';

function UserMiniCard({ user }) {
  const initials = user?.username ? user.username.slice(0, 2).toUpperCase() : '??';

  return (
    <Link
      to={`/u/${user.username}`}
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/40 transition-all group"
    >
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.username}
          className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
        />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-xs font-bold text-white ring-2 ring-white">
          {initials}
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
          {user.username}
        </p>
        <p className="truncate text-[11px] text-slate-400">{user.role ?? 'Member'}</p>
      </div>
    </Link>
  );
}

export function LeftSidebar() {
  const { openAuthModal, user } = useAuth();
  const location = useLocation();

  const guestNavLinks = [
    { label: 'Home Feed', href: '/', icon: <Home size={16} /> },
    { label: 'Popular', href: '/?sort=hot', icon: <Flame size={16} /> },
    { label: 'Explore Tags', href: '/tags', icon: <Hash size={16} /> },
  ];

  const loggedInNavLinks = [
    { label: 'Home Feed', href: '/', icon: <Home size={16} /> },
    { label: 'Popular', href: '/?sort=hot', icon: <Flame size={16} /> },
    { label: 'Reading List', href: '/bookmarks', icon: <Bookmark size={16} /> },
    { label: 'My Stories', href: '/me/stories', icon: <BookOpen size={16} /> },
    { label: 'Explore Tags', href: '/tags', icon: <Hash size={16} /> },
  ];

  const navLinks = user ? loggedInNavLinks : guestNavLinks;

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/' && !location.search.includes('sort=hot');
    }
    if (href === '/?sort=hot') {
      return location.pathname === '/' && location.search.includes('sort=hot');
    }
    return location.pathname === href;
  };

  return (
    <div className="space-y-3">
      {/* Navigation Links */}
      <nav className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm space-y-0.5">
        {navLinks.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              isActive(item.href)
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className={isActive(item.href) ? 'text-indigo-600' : 'text-slate-400'}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {user ? (
        /* ---- LOGGED-IN STATE ---- */
        <>
          {/* Write Post CTA */}
          <Link
            to="/new-post"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
          >
            <PenSquare size={14} />
            Write a Post
          </Link>

          {/* User mini card */}
          <UserMiniCard user={user} />
        </>
      ) : (
        /* ---- GUEST STATE ---- */
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-bold leading-snug text-slate-900">
            Join the ByteBlog Community
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
            Share ideas, write technical posts, and connect with engineers worldwide.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={openAuthModal}
              className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <FaGoogle size={14} className="text-red-500" />
              Continue with Google
            </button>
            <button
              onClick={openAuthModal}
              className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <FaApple size={14} className="text-black" />
              Continue with Apple
            </button>
            <button
              onClick={openAuthModal}
              className="flex h-9 w-full items-center justify-center gap-2 rounded-full bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm transition-colors"
            >
              <Mail size={14} />
              Continue with Email
            </button>
          </div>

          <p className="mt-3 text-[10px] leading-relaxed text-slate-400">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-slate-600 hover:underline">User Agreement</Link>{' '}
            and acknowledge our{' '}
            <Link to="/privacy" className="text-slate-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
