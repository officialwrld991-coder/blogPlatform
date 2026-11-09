import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Heart, MessageCircle, Share2, MoreHorizontal, EyeOff, BellOff, UserMinus, ThumbsDown, ThumbsUp } from 'lucide-react';
import { formatDate } from '../../lib/formatDate';
import { cn } from '../../lib/cn';
import { MediaGrid } from './MediaGrid';
import { AuthPrompt } from '../ui/AuthPrompt';
import { ShareMenu } from './ShareMenu';
import { useAuth } from '../../context/AuthContext';

export function PostCard({ post }) {
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const [liked, setLiked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  
  const menuRef = useRef(null);
  const shareRef = useRef(null);

  const postUrl = `${window.location.origin}/post/${post.id}`;

  const likeCount = post.likeCount + (liked ? 1 : 0);

  // Close menus on outside click
  useEffect(() => {
    function handler(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isGuest) {
      setShowAuthPrompt(true);
    } else {
      setLiked((v) => !v);
    }
  };

  return (
    <>
      <article 
        onClick={() => navigate(`/post/${post.id}`)}
        className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 transition-all hover:bg-slate-50 hover:shadow-sm sm:p-5"
      >
        {/* HEADER ROW (unchanged) */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Link to={`/u/${post.author.username}`} onClick={(e) => e.stopPropagation()} className="relative z-10">
              <img src={post.author.avatarUrl} alt={post.author.username} className="h-8 w-8 rounded-full object-cover hover:opacity-80" />
            </Link>
            <div>
              <Link to={`/u/${post.author.username}`} onClick={(e) => e.stopPropagation()} className="relative z-10 text-sm font-semibold text-slate-900 hover:underline">
                {post.author.username}
              </Link>
              <p className="text-xs text-slate-500">{formatDate(post.createdAt)} · {post.readingTimeMinutes} min read</p>
            </div>
          </div>

          {/* 3-DOT MENU */}
          <div className="relative" ref={menuRef}>
            <button onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-700">
              <MoreHorizontal size={18} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-10 z-20 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                <MenuItem icon={<ThumbsUp size={16} />}>Interested</MenuItem>
                <MenuItem icon={<ThumbsDown size={16} />}>Not interested</MenuItem>
                <MenuItem icon={<BellOff size={16} />}>Turn off notifications</MenuItem>
                <MenuItem icon={<EyeOff size={16} />}>Hide post</MenuItem>
                <MenuItem icon={<UserMinus size={16} />}>Unfollow {post.author.username}</MenuItem>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-3">
          <h2 className="text-lg font-bold leading-snug text-slate-900 hover:text-indigo-600 transition-colors">
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {post.excerpt}
          </p>
          {post.media.length > 0 && (
            <div className="mt-3" onClick={(e) => e.stopPropagation()}>
              <MediaGrid media={post.media} />
            </div>
          )}
        </div>

        {/* TAGS */}
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} to={`/tag/${tag}`} onClick={(e) => e.stopPropagation()} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700">
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* ENGAGEMENT BAR */}
        <div className="mt-4 flex items-center gap-6 border-t border-slate-100 pt-3 text-sm text-slate-500">
          {/* LIKE */}
          <button onClick={handleLike} className={cn("flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-rose-50 hover:text-rose-600", liked && "text-rose-600")}>
            <Heart size={16} className={cn(liked && "fill-rose-600")} />
            <span>{likeCount}</span>
          </button>

          {/* COMMENT - Navigates to post */}
          <Link to={`/post/${post.id}#comments`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-indigo-50 hover:text-indigo-700">
            <MessageCircle size={16} />
            <span>{post.commentCount}</span>
          </Link>

          {/* SHARE - Opens menu */}
          <div className="relative" ref={shareRef}>
            <button onClick={(e) => { e.stopPropagation(); setShareOpen((v) => !v); }} className="flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-slate-100 hover:text-slate-800">
              <Share2 size={16} />
              <span>Share</span>
            </button>
            <ShareMenu isOpen={shareOpen} onClose={() => setShareOpen(false)} url={postUrl} title={post.title} />
          </div>
        </div>
      </article>

      <AuthPrompt isOpen={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />
    </>
  );
}

function MenuItem({ icon, children }) {
  return (
    <button type="button" className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
      {icon}
      {children}
    </button>
  );
}
