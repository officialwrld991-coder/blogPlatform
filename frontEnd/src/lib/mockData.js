export const MOCK_POSTS = [
  {
    id: 'p-1',
    author: { id: 'u-1', username: 'ada_writes', avatarUrl: 'https://i.pravatar.cc/150?u=ada_writes' },
    title: 'Why I stopped putting business logic in my FastAPI routes',
    excerpt: 'Routes should route. Services should think. Repositories should talk to the DB. It took me two years and one painful refactor to actually believe this.',
    tags: ['python', 'fastapi', 'architecture'],
    readingTimeMinutes: 6,
    likeCount: 342,
    commentCount: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    media: [
      { id: 'm1', type: 'image', url: 'https://picsum.photos/seed/fastapi/1200/600' }
    ]
  },
  {
    id: 'p-2',
    author: { id: 'u-2', username: 'tunde_dev', avatarUrl: 'https://i.pravatar.cc/150?u=tunde_dev' },
    title: 'Tailwind made me a better CSS developer',
    excerpt: 'I resisted for two years. Then I realized the utility classes taught me spacing, color, and layout faster than any tutorial ever did.',
    tags: ['css', 'tailwind', 'frontend'],
    readingTimeMinutes: 4,
    likeCount: 187,
    commentCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    media: [] // No media, text only
  },
  {
    id: 'p-3',
    author: { id: 'u-4', username: 'emeka', avatarUrl: 'https://i.pravatar.cc/150?u=emeka' },
    title: 'My 4 monitor setup for maximum productivity',
    excerpt: 'You only really need three, but four looks cooler on Instagram.',
    tags: ['setup', 'hardware'],
    readingTimeMinutes: 2,
    likeCount: 89,
    commentCount: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    // 4 images for the grid
    media: [
      { id: 'm2', type: 'image', url: 'https://picsum.photos/seed/desk1/600/600' },
      { id: 'm3', type: 'image', url: 'https://picsum.photos/seed/desk2/600/600' },
      { id: 'm4', type: 'image', url: 'https://picsum.photos/seed/desk3/600/600' },
      { id: 'm5', type: 'image', url: 'https://picsum.photos/seed/desk4/600/600' },
    ]
  },
  {
    id: 'p-4',
    author: { id: 'u-5', username: 'zainab_k', avatarUrl: 'https://i.pravatar.cc/150?u=zainab_k' },
    title: 'Design tokens are the API of your design system',
    excerpt: 'If your designers and your engineers disagree on what "primary" means, you don’t have a design system. You have a shared folder.',
    tags: ['design', 'systems'],
    readingTimeMinutes: 5,
    likeCount: 64,
    commentCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    // 2 images for the grid
    media: [
      { id: 'm6', type: 'image', url: 'https://picsum.photos/seed/design1/800/600' },
      { id: 'm7', type: 'image', url: 'https://picsum.photos/seed/design2/800/600' },
    ]
  },
  {
    id: 'p-5',
    author: { id: 'u-6', username: 'admin', avatarUrl: 'https://i.pravatar.cc/150?u=admin' },
    title: 'Welcome to byte-blog',
    excerpt: 'This is the first official post on the platform. We are building the future of developer blogging.',
    tags: ['announcement', 'meta'],
    readingTimeMinutes: 1,
    likeCount: 999,
    commentCount: 42,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    media: [],
  }
];

export const getMockUser = (username) => {
  const users = {
    ada_writes: {
      username: 'ada_writes',
      displayName: 'Adaeze Nwosu',
      bio: 'Backend engineer & distributed systems enthusiast. Writes about Python, FastAPI, and resilient software architectures.',
      joined: '2023-09-15T09:00:00Z',
      avatarUrl: 'https://i.pravatar.cc/150?u=ada_writes',
      followers: 2420,
      following: 142,
      location: 'Lagos, Nigeria',
      website: 'adanwosu.dev'
    },
    tunde_dev: {
      username: 'tunde_dev',
      displayName: 'Tunde Bakare',
      bio: 'Full-stack developer building with React, TypeScript, and modern CSS. Passionate about UI performance and dev tooling.',
      joined: '2024-01-10T11:00:00Z',
      avatarUrl: 'https://i.pravatar.cc/150?u=tunde_dev',
      followers: 1870,
      following: 89,
      location: 'London, UK',
      website: 'tundedev.io'
    },
    emeka: {
      username: 'emeka',
      displayName: 'Emeka Okonkwo',
      bio: 'DevOps & Cloud architect. Hardware setups, terminal workflows, and Kubernetes clusters at scale.',
      joined: '2023-11-20T14:30:00Z',
      avatarUrl: 'https://i.pravatar.cc/150?u=emeka',
      followers: 940,
      following: 64,
      location: 'Berlin, Germany',
      website: 'emeka.cloud'
    },
    zainab_k: {
      username: 'zainab_k',
      displayName: 'Zainab Kolawole',
      bio: 'Product Designer & Frontend Engineer. Bridging design tokens with production React components.',
      joined: '2024-02-01T08:00:00Z',
      avatarUrl: 'https://i.pravatar.cc/150?u=zainab_k',
      followers: 1450,
      following: 110,
      location: 'Toronto, Canada',
      website: 'zainabk.design'
    },
    admin: {
      username: 'admin',
      displayName: 'Byte-Blog Team',
      bio: 'Official platform news, engineering updates, community guidelines, and technical changelogs.',
      joined: '2023-01-01T00:00:00Z',
      avatarUrl: 'https://i.pravatar.cc/150?u=admin',
      followers: 15400,
      following: 12,
      location: 'Global',
      website: 'byte-blog.dev'
    }
  };

  return users[username] || {
    username,
    displayName: username.replace('_', ' '),
    bio: 'Software engineer and writer on Byte-Blog.',
    joined: '2024-01-15T09:00:00Z',
    avatarUrl: `https://i.pravatar.cc/150?u=${username}`,
    followers: 124,
    following: 38,
    location: 'Remote',
    website: 'byte-blog.dev'
  };
};

