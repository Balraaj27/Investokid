// Mock Data for Fallback when Backend is not connected

export const mockArticles = [
  {
    id: '1',
    title: "What is Investing? A Beginner's Complete Guide",
    excerpt: "Learn the fundamental concepts of investing, why it's important, and how to get started with your first investment.",
    content: "Investing is the act of allocating money or capital to an endeavor with the expectation of obtaining additional income or profit...",
    author: "Sarah Johnson",
    category: "Investment Basics",
    status: "published" as const,
    publish_date: "2024-12-15",
    read_time: "8 min read",
    views: 12500,
    tags: ["investing", "beginner", "finance"],
    content_blocks: [
      {
        id: '1',
        type: 'heading' as const,
        content: 'What is Investing?',
        metadata: { level: 2 }
      },
      {
        id: '2',
        type: 'paragraph' as const,
        content: 'Investing is the act of allocating money or capital to an endeavor with the expectation of obtaining additional income or profit...'
      }
    ],
    created_at: "2024-12-15T10:00:00Z",
    updated_at: "2024-12-15T10:00:00Z"
  },
  {
    id: '2',
    title: "Understanding Risk vs Return in Investments",
    excerpt: "Discover the relationship between investment risk and potential returns, and how to balance them in your portfolio.",
    content: "The risk-return tradeoff is a fundamental principle in investing...",
    author: "Michael Chen",
    category: "Investment Basics",
    status: "published" as const,
    publish_date: "2024-12-12",
    read_time: "6 min read",
    views: 8900,
    tags: ["risk", "return", "portfolio"],
    content_blocks: [],
    created_at: "2024-12-12T10:00:00Z",
    updated_at: "2024-12-12T10:00:00Z"
  },
  {
    id: '3',
    title: "Technical Analysis Fundamentals",
    excerpt: "Learn the basics of technical analysis and how to read price charts effectively.",
    content: "Technical analysis is the study of past market data...",
    author: "Alex Thompson",
    category: "Technical Analysis",
    status: "published" as const,
    publish_date: "2024-12-10",
    read_time: "10 min read",
    views: 15600,
    tags: ["technical", "analysis", "charts"],
    content_blocks: [],
    created_at: "2024-12-10T10:00:00Z",
    updated_at: "2024-12-10T10:00:00Z"
  },
  {
    id: '4',
    title: "Creating Your First Budget",
    excerpt: "Learn how to create a realistic budget that works for your lifestyle and financial goals.",
    content: "Budgeting is the foundation of financial planning...",
    author: "Jennifer Martinez",
    category: "Financial Planning",
    status: "published" as const,
    publish_date: "2024-12-08",
    read_time: "9 min read",
    views: 11200,
    tags: ["budgeting", "planning", "finance"],
    content_blocks: [],
    created_at: "2024-12-08T10:00:00Z",
    updated_at: "2024-12-08T10:00:00Z"
  },
  {
    id: '5',
    title: "What is Bitcoin? A Beginner's Guide",
    excerpt: "Learn the fundamentals of Bitcoin, how it works, and why it's considered digital gold.",
    content: "Bitcoin is a decentralized digital currency...",
    author: "Alex Chen",
    category: "Cryptocurrency",
    status: "published" as const,
    publish_date: "2024-12-05",
    read_time: "10 min read",
    views: 18700,
    tags: ["bitcoin", "crypto", "blockchain"],
    content_blocks: [],
    created_at: "2024-12-05T10:00:00Z",
    updated_at: "2024-12-05T10:00:00Z"
  }
];

export const mockNews = [
  {
    id: '1',
    title: 'Sensex rises 200 points on strong FII inflows',
    description: 'Indian equity markets opened higher today driven by positive global cues and strong foreign institutional investor inflows.',
    content: 'The Indian stock market witnessed a strong rally today...',
    source: 'Economic Times',
    author: 'Market Reporter',
    category: 'Market News',
    status: 'active' as const,
    publish_date: '2024-12-15',
    external_link: 'https://economictimes.indiatimes.com/example',
    views: 15600,
    tags: ['sensex', 'fii', 'market'],
    created_at: '2024-12-15T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'RBI maintains repo rate at 6.5% in latest policy review',
    description: 'The Reserve Bank of India kept the benchmark repo rate unchanged at 6.5% citing inflation concerns.',
    content: 'The Reserve Bank of India announced its latest monetary policy...',
    source: 'Business Standard',
    author: 'Policy Reporter',
    category: 'Policy News',
    status: 'active' as const,
    publish_date: '2024-12-14',
    external_link: 'https://business-standard.com/example',
    views: 12300,
    tags: ['rbi', 'repo rate', 'policy'],
    created_at: '2024-12-14T10:00:00Z',
    updated_at: '2024-12-14T10:00:00Z'
  }
];

export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    role: 'user' as const,
    status: 'active' as const,
    join_date: '2024-01-15',
    last_login: '2024-12-15T10:00:00Z',
    articles_read: 45,
    subscription_type: 'premium' as const,
    avatar: undefined,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    role: 'admin' as const,
    status: 'active' as const,
    join_date: '2024-01-10',
    last_login: '2024-12-15T09:00:00Z',
    articles_read: 120,
    subscription_type: 'pro' as const,
    avatar: undefined,
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-12-15T09:00:00Z'
  }
];

export const mockUpdates = [
  {
    id: '1',
    title: 'New Advanced Portfolio Analytics Dashboard',
    excerpt: 'Introducing comprehensive portfolio analysis tools with risk metrics, performance tracking, and detailed asset allocation insights.',
    content: 'We are excited to announce the launch of our new Advanced Portfolio Analytics Dashboard...',
    author: 'Investokid Team',
    category: 'Feature Release',
    status: 'published' as const,
    publish_date: '2024-12-18',
    read_time: '3 min read',
    views: 2500,
    is_pinned: true,
    is_new: true,
    tags: ['portfolio', 'analytics', 'dashboard'],
    created_at: '2024-12-18T10:00:00Z',
    updated_at: '2024-12-18T10:00:00Z'
  },
  {
    id: '2',
    title: 'Mobile App Performance Improvements',
    excerpt: 'Enhanced loading speeds and improved user experience across all mobile devices.',
    content: 'Our latest mobile app update includes significant performance improvements...',
    author: 'Development Team',
    category: 'App Update',
    status: 'published' as const,
    publish_date: '2024-12-16',
    read_time: '2 min read',
    views: 1800,
    is_pinned: false,
    is_new: true,
    tags: ['mobile', 'performance', 'update'],
    created_at: '2024-12-16T10:00:00Z',
    updated_at: '2024-12-16T10:00:00Z'
  }
];