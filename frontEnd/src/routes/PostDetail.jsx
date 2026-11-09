import { useParams, Link } from 'react-router';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MOCK_POSTS } from '../lib/mockData';
import { MediaGrid } from '../components/post/MediaGrid';
import { BackButton } from '../components/ui/BackButton';
import { CommentSection } from '../components/comment/CommentSection';
import { AuthPrompt } from '../components/ui/AuthPrompt';
import { ShareMenu } from '../components/post/ShareMenu';
import { formatDate } from '../lib/formatDate';
import { cn } from '../lib/cn';
import { useAuth } from '../context/AuthContext';

export function PostDetail() {
  const { id } = useParams();
  const { isGuest } = useAuth();
  const [liked, setLiked] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const post = MOCK_POSTS.find((p) => p.id === id);

  // Scroll to comments if URL has #comments
  useEffect(() => {
    if (window.location.hash === '#comments') {
      document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [id]);

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-semibold">Post not found</h1>
        <Link to="/" className="mt-3 inline-block text-indigo-600 hover:underline">Back to feed</Link>
      </div>
    );
  }

  const likeCount = post.likeCount + (liked ? 1 : 0);
  const postUrl = `${window.location.origin}/post/${post.id}`;

  const handleInteraction = (action) => {
    if (isGuest) {
      setShowAuthPrompt(true);
      return;
    }
    if (action === 'like') setLiked((v) => !v);
  };

  return (
    <>
      <article>
        <BackButton />
        {/* Header, Title, Media, Body, Tags (unchanged) */}
        <div className="flex items-center gap-3">
          <Link to={`/u/${post.author.username}`}>
            <img src={post.author.avatarUrl} alt={post.author.username} className="h-10 w-10 rounded-full object-cover" />
          </Link>
          <div>
            <Link to={`/u/${post.author.username}`} className="text-base font-semibold text-slate-900 hover:underline">{post.author.username}</Link>
            <p className="text-sm text-slate-500">{formatDate(post.createdAt)} · {post.readingTimeMinutes} min read</p>
          </div>
        </div>
        <h1 className="mt-6 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">{post.title}</h1>
        {post.media.length > 0 && <div className="mt-5"><MediaGrid media={post.media} /></div>}
        <div className="mt-6 text-base leading-relaxed text-slate-700">
          <p>{post.excerpt}</p>
          <p className="mt-4">This is where the full markdown content of the post will go once we connect to the backend...</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} to={`/tag/${tag}`} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700">#{tag}</Link>
          ))}
        </div>

        {/* ENGAGEMENT BAR */}
        <div className="mt-8 flex items-center gap-6 border-y border-slate-200 py-3 text-sm text-slate-500">
          <button onClick={() => handleInteraction('like')} className={cn("flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-rose-50 hover:text-rose-600", liked && "text-rose-600")}>
            <Heart size={18} className={cn(liked && "fill-rose-600")} />
            <span>{likeCount}</span>
          </button>

          <a href="#comments" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-indigo-50 hover:text-indigo-700">
            <MessageCircle size={18} />
            <span>{post.commentCount}</span>
          </a>

          <div className="relative">
            <button onClick={() => setShareOpen((v) => !v)} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-800">
              <Share2 size={18} />
              <span>Share</span>
            </button>
            <ShareMenu isOpen={shareOpen} onClose={() => setShareOpen(false)} url={postUrl} title={post.title} />
          </div>
        </div>

        {/* COMMENTS SECTION - Pass down auth prompt trigger */}
        <CommentSection 
          count={post.commentCount} 
          isGuest={isGuest} 
          onAuthRequired={() => setShowAuthPrompt(true)} 
        />
      </article>

      <AuthPrompt isOpen={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />
    </>
  );
}
