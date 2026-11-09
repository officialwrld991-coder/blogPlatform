import { useParams } from 'react-router';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { MOCK_POSTS, getMockUser } from '../lib/mockData';
import { PostList } from '../components/post/PostList';
import { BackButton } from '../components/ui/BackButton';
import { cn } from '../lib/cn';

export function Profile() {
  const { username } = useParams();
  const [tab, setTab] = useState('posts');
  const [following, setFollowing] = useState(false);

  const user = getMockUser(username);
  const userPosts = MOCK_POSTS.filter((p) => p.author.username === username);

  return (
    <div>
      <BackButton />
      
      {/* Banner */}
      <div className="h-32 rounded-t-xl bg-gradient-to-r from-indigo-500 to-violet-500 sm:h-48" />
      
      <div className="px-4 sm:px-6">
        {/* Avatar & Follow Button */}
        <div className="-mt-12 flex items-end justify-between sm:-mt-16">
          <img 
            src={user.avatarUrl} 
            alt={user.username} 
            className="h-24 w-24 rounded-full border-4 border-white object-cover sm:h-32 sm:w-32" 
          />
          <button
            onClick={() => setFollowing(!following)}
            className={cn(
              "mb-2 rounded-full px-6 py-2 text-sm font-semibold transition-colors",
              following 
                ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50" 
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            {following ? 'Following' : 'Follow'}
          </button>
        </div>

        {/* User Info */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-slate-900">{user.displayName}</h1>
          <p className="text-sm text-slate-500">@{user.username}</p>
          
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-700">
            {user.bio}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><MapPin size={14} /> Lagos, Nigeria</span>
            <span className="flex items-center gap-1"><LinkIcon size={14} /> byte-blog.dev</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> Joined Jan 2024</span>
          </div>

          <div className="mt-4 flex items-center gap-6 text-sm">
            <span className="font-bold text-slate-900">{userPosts.length} <span className="font-normal text-slate-500">Posts</span></span>
            <span className="font-bold text-slate-900">{user.followers} <span className="font-normal text-slate-500">Followers</span></span>
            <span className="font-bold text-slate-900">{user.following} <span className="font-normal text-slate-500">Following</span></span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex border-b border-slate-200">
        {['posts', 'about'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px border-b-2 px-6 py-3 text-sm font-medium capitalize transition-colors",
              tab === t ? "border-indigo-600 text-indigo-700" : "border-transparent text-slate-500 hover:text-slate-800"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {tab === 'posts' ? (
          <PostList posts={userPosts} />
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
             <h3 className="font-semibold text-slate-900 mb-2">About</h3>
             <p>This user hasn't written an about section yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
