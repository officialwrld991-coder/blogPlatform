import { useState } from 'react';
import { Link, useMatch } from 'react-router';
import { Hash, Calendar, MapPin, Users, BookOpen } from 'lucide-react';
import { MOCK_POSTS, getMockUser } from '../../lib/mockData';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../lib/formatDate';

export function RightSidebar() {
  const { openAuthModal, isGuest } = useAuth();
  const postMatch = useMatch('/post/:id');
  const [following, setFollowing] = useState(false);

  // If on a post page, retrieve the current post and author
  const currentPost = postMatch ? MOCK_POSTS.find((p) => p.id === postMatch.params.id) : null;
  const author = currentPost ? getMockUser(currentPost.author.username) : null;
  const authorPosts = currentPost ? MOCK_POSTS.filter((p) => p.author.username === currentPost.author.username) : [];

  const handleFollowClick = () => {
    if (isGuest) {
      openAuthModal();
      return;
    }
    setFollowing((v) => !v);
  };

  const popularTags = [
    { name: 'react', count: 1240 },
    { name: 'python', count: 982 },
    { name: 'webdev', count: 875 },
    { name: 'javascript', count: 756 },
    { name: 'fastapi', count: 312 },
  ];

  return (
    <div className="space-y-4">

      {/* DYNAMIC VIEW: If viewing a post, show the Reddit-style Author Card */}
      {author ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Header Banner */}
          <div className="h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" />
          
          <div className="p-4 pt-0">
            {/* Avatar & Follow */}
            <div className="-mt-8 flex items-end justify-between">
              <Link to={`/u/${author.username}`}>
                <img
                  src={author.avatarUrl}
                  alt={author.username}
                  className="h-16 w-16 rounded-full border-4 border-white object-cover shadow-sm hover:opacity-90"
                />
              </Link>
              <button
                onClick={handleFollowClick}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  following
                    ? 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                }`}
              >
                {following ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Author Details */}
            <div className="mt-3">
              <Link
                to={`/u/${author.username}`}
                className="text-base font-bold text-slate-900 hover:underline"
              >
                {author.displayName}
              </Link>
              <p className="text-xs text-slate-500">@{author.username}</p>
              
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {author.bio}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                {author.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {author.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> Joined {formatDate(author.joined)}
                </span>
              </div>

              {/* Stats Bar */}
              <div className="mt-4 grid grid-cols-3 divide-x divide-slate-100 rounded-lg bg-slate-50 p-2 text-center text-xs">
                <div>
                  <div className="font-bold text-slate-900">{authorPosts.length}</div>
                  <div className="text-[10px] text-slate-500">Posts</div>
                </div>
                <div>
                  <div className="font-bold text-slate-900">{author.followers.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-500">Followers</div>
                </div>
                <div>
                  <div className="font-bold text-slate-900">{author.following}</div>
                  <div className="text-[10px] text-slate-500">Following</div>
                </div>
              </div>

              {/* More From This Author */}
              {authorPosts.length > 1 && (
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    More from {author.displayName}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {authorPosts
                      .filter((p) => p.id !== currentPost.id)
                      .slice(0, 2)
                      .map((p) => (
                        <li key={p.id}>
                          <Link
                            to={`/post/${p.id}`}
                            className="text-xs font-medium text-slate-700 hover:text-indigo-600 line-clamp-1"
                          >
                            {p.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* HOME / DEFAULT VIEW: Community Card */
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-sm">
              B
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">About Byte-Blog</h3>
              <p className="text-[11px] text-slate-500">The developer blog network</p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-600">
            A real-time platform where software engineers share architectural breakdowns, tutorials, and developer experiences.
          </p>
          <div className="mt-3 flex items-center justify-between border-y border-slate-100 py-2 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Users size={14} className="text-indigo-600" /> 18.4k Members
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen size={14} className="text-emerald-600" /> 2.1k Articles
            </span>
          </div>
          {isGuest && (
            <button
              onClick={openAuthModal}
              className="mt-3 flex h-9 w-full items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              Join the Community
            </button>
          )}
        </div>
      )}

      {/* Popular Tags Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Popular Tags
        </h3>
        <ul className="space-y-2.5">
          {popularTags.map((tag) => (
            <li key={tag.name}>
              <Link
                to={`/tag/${tag.name}`}
                className="group flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 text-slate-700 group-hover:text-indigo-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 group-hover:bg-indigo-50">
                    <Hash size={11} />
                  </span>
                  <span className="font-medium">#{tag.name}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{tag.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-slate-400 px-1">
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/privacy" className="hover:underline">Privacy</Link>
        <Link to="/terms" className="hover:underline">Terms</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <span className="w-full pt-1 text-[10px] text-slate-400">© {new Date().getFullYear()} Byte-Blog, Inc.</span>
      </div>

    </div>
  );
}
