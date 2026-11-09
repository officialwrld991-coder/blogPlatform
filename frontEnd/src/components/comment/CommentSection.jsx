import { useState } from 'react';
import { Heart, Reply, Share2, X } from 'lucide-react';
import { CommentComposer } from './CommentComposer';
import { formatDate } from '../../lib/formatDate';
import { cn } from '../../lib/cn';

// Make sure this array is defined at the top level of this file!
const MOCK_COMMENTS = [
  {
    id: 'c1',
    author: { username: 'tunde_dev', avatarUrl: 'https://i.pravatar.cc/150?u=tunde_dev' },
    body: 'This is exactly the refactor I keep putting off. The "route becomes three lines" thing sold me.',
    likes: 24,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    replies: [
      {
        id: 'c2',
        author: { username: 'ada_writes', avatarUrl: 'https://i.pravatar.cc/150?u=ada_writes' },
        body: 'Do it. The first service you extract will feel silly. The fifth will feel obvious.',
        likes: 12,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      }
    ]
  },
  {
    id: 'c3',
    author: { username: 'chioma_reads', avatarUrl: 'https://i.pravatar.cc/150?u=chioma_reads' },
    body: 'Counterpoint: for a 3-endpoint app this is overkill. But I agree once it grows.',
    likes: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    replies: []
  }
];

export function CommentSection({ count, isGuest, onAuthRequired }) {
  const [replyingTo, setReplyingTo] = useState(null);

  const handleReplyClick = (username) => {
    if (isGuest) {
      onAuthRequired();
      return;
    }
    setReplyingTo(username);
  };

  return (
    <div id="comments" className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Comments ({count})</h2>
      
      <div className="relative">
        {replyingTo && (
          <div className="absolute -top-10 left-0 flex w-full items-center justify-between rounded-t-lg bg-indigo-50 px-4 py-2 text-xs text-indigo-700">
            <span>Replying to <span className="font-semibold">@{replyingTo}</span></span>
            <button onClick={() => setReplyingTo(null)}><X size={14} /></button>
          </div>
        )}
        <CommentComposer isGuest={isGuest} onAuthRequired={onAuthRequired} />
      </div>

      {count === 0 ? (
        <p className="mt-6 text-center text-sm text-slate-500">Be the first to comment.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {MOCK_COMMENTS.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              depth={0} 
              onReply={handleReplyClick} 
              isGuest={isGuest}
              onAuthRequired={onAuthRequired}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentItem({ comment, depth, onReply, isGuest, onAuthRequired }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (isGuest) {
      onAuthRequired();
      return;
    }
    setLiked(!liked);
  };

  return (
    <div className={cn(depth > 0 && "ml-4 border-l-2 border-slate-100 pl-4")}>
      <div className="py-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <img src={comment.author.avatarUrl} className="h-5 w-5 rounded-full" />
          <span className="font-semibold text-slate-700">{comment.author.username}</span>
          <span>·</span>
          <span>{formatDate(comment.createdAt)}</span>
        </div>
        
        <p className="mt-1.5 text-sm text-slate-700">{comment.body}</p>
        
        <div className="mt-1 flex items-center gap-4 text-xs font-medium text-slate-500">
          <button onClick={handleLike} className={cn("flex items-center gap-1 hover:text-rose-500", liked && "text-rose-500")}>
            <Heart size={14} className={cn(liked && "fill-rose-500")} />
            {comment.likes}
          </button>
          <button onClick={() => onReply(comment.author.username)} className="flex items-center gap-1 hover:text-slate-800">
            <Reply size={14} /> Reply
          </button>
          <button className="flex items-center gap-1 hover:text-slate-800">
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <CommentItem 
          key={reply.id} 
          comment={reply} 
          depth={depth + 1} 
          onReply={onReply}
          isGuest={isGuest}
          onAuthRequired={onAuthRequired}
        />
      ))}
    </div>
  );
}
