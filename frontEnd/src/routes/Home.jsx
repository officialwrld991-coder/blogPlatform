import { PostList } from '../components/post/PostList';
import { MOCK_POSTS } from '../lib/mockData';

export function Home() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-1 border-b border-slate-200">
        {['Hot', 'New', 'Top'].map((tab) => (
          <button
            key={tab}
            className="border-b-2 border-transparent px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            {tab}
          </button>
        ))}
      </div>

      <PostList posts={MOCK_POSTS} />
    </div>
  );
}
