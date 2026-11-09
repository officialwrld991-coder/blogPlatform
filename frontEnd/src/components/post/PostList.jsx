import { PostCard } from './PostCard';

export function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className="text-center text-slate-500">No posts yet.</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
