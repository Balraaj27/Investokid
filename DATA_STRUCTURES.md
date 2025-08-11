# Investokid Platform - Complete Data Structure Documentation

This document outlines the exact data structures used in the frontend for each section. Use this to design your backend database schema and API endpoints.

## 📊 **1. ARTICLES (Learning Section)**

### **Article Interface**
```typescript
interface Article {
  id: number;                    // Primary key
  title: string;                 // Article title
  excerpt: string;               // Short description (200-300 chars)
  content: string;               // Full article content (legacy field)
  author: string;                // Author name
  category: string;              // Category name
  status: 'draft' | 'published' | 'archived';  // Publication status
  publishDate: string;           // ISO date string (YYYY-MM-DD)
  readTime: string;              // e.g., "8 min read"
  views: number;                 // View count
  tags: string[];                // Array of tag strings
  contentBlocks: ContentBlock[]; // Rich content blocks (new system)
}
```

### **ContentBlock Interface**
```typescript
interface ContentBlock {
  id: string;                    // Unique block identifier
  type: 'heading' | 'paragraph' | 'image' | 'video' | 'quote' | 'list' | 'code';
  content: string;               // Block content
  metadata?: {
    level?: number;              // Heading level (1-6)
    alt?: string;                // Image alt text
    caption?: string;            // Image/video caption
    url?: string;                // Video URL
    listType?: 'ordered' | 'unordered';  // List type
    language?: string;           // Code language
    alignment?: 'left' | 'center' | 'right';  // Text alignment
  };
}
```

### **Sample Article Data**
```json
{
  "id": 1,
  "title": "What is Investing? A Beginner's Complete Guide",
  "excerpt": "Learn the fundamental concepts of investing, why it's important, and how to get started with your first investment.",
  "content": "Investing is the act of allocating money or capital to an endeavor with the expectation of obtaining additional income or profit...",
  "author": "Sarah Johnson",
  "category": "Investment Basics",
  "status": "published",
  "publishDate": "2024-12-15",
  "readTime": "8 min read",
  "views": 12500,
  "tags": ["investing", "beginner", "finance"],
  "contentBlocks": [
    {
      "id": "1",
      "type": "heading",
      "content": "What is Investing?",
      "metadata": { "level": 2 }
    },
    {
      "id": "2",
      "type": "paragraph",
      "content": "Investing is the act of allocating money or capital to an endeavor with the expectation of obtaining additional income or profit..."
    },
    {
      "id": "3",
      "type": "image",
      "content": "https://example.com/investing-chart.jpg",
      "metadata": {
        "alt": "Investment growth chart",
        "caption": "Example of compound growth over time"
      }
    },
    {
      "id": "4",
      "type": "quote",
      "content": "The best time to plant a tree was 20 years ago. The second best time is now.",
      "metadata": {
        "caption": "Warren Buffett"
      }
    },
    {
      "id": "5",
      "type": "list",
      "content": "Stocks\nBonds\nReal Estate\nCommodities",
      "metadata": {
        "listType": "unordered"
      }
    },
    {
      "id": "6",
      "type": "code",
      "content": "const investmentReturn = principal * Math.pow(1 + rate, time);",
      "metadata": {
        "language": "javascript"
      }
    }
  ]
}
```

### **Categories Used**
- "Investment Basics"
- "Technical Analysis"
- "Financial Planning"
- "Cryptocurrency"

---

## 📰 **2. NEWS MANAGEMENT**

### **NewsItem Interface**
```typescript
interface NewsItem {
  id: number;                    // Primary key
  title: string;                 // News headline
  description: string;           // News summary (200-300 chars)
  content: string;               // Full news content
  source: string;                // News source name
  author: string;                // Author/Reporter name
  category: string;              // News category
  status: 'active' | 'inactive' | 'featured';  // Display status
  publishDate: string;           // ISO date string
  link: string;                  // External news URL
  views: number;                 // View count
  tags: string[];                // Array of tags
}
```

### **Sample News Data**
```json
{
  "id": 1,
  "title": "Sensex rises 200 points on strong FII inflows",
  "description": "Indian equity markets opened higher today driven by positive global cues and strong foreign institutional investor inflows.",
  "content": "The Indian stock market witnessed a strong rally today as the Sensex gained over 200 points...",
  "source": "Economic Times",
  "author": "Market Reporter",
  "category": "Market News",
  "status": "active",
  "publishDate": "2024-12-15",
  "link": "https://economictimes.indiatimes.com/example",
  "views": 15600,
  "tags": ["sensex", "fii", "market"]
}
```

### **News Sources Used**
- "Economic Times"
- "Business Standard"
- "Moneycontrol"
- "LiveMint"
- "Financial Express"

### **News Categories Used**
- "Market News"
- "Policy News"
- "Sector News"
- "Company News"
- "Global News"

---

## 👥 **3. USER MANAGEMENT**

### **UserData Interface**
```typescript
interface UserData {
  id: number;                    // Primary key
  name: string;                  // Full name
  email: string;                 // Email address (unique)
  role: 'admin' | 'editor' | 'user' | 'subscriber';  // User role
  status: 'active' | 'inactive' | 'banned';  // Account status
  joinDate: string;              // Registration date (ISO)
  lastLogin: string;             // Last login date (ISO)
  articlesRead: number;          // Articles read count
  subscriptionType: 'free' | 'premium' | 'pro';  // Subscription level
  avatar?: string;               // Profile image URL (optional)
}
```

### **Sample User Data**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@email.com",
  "role": "user",
  "status": "active",
  "joinDate": "2024-01-15",
  "lastLogin": "2024-12-15",
  "articlesRead": 45,
  "subscriptionType": "premium",
  "avatar": "https://example.com/avatars/john.jpg"
}
```

---

## ⚡ **4. PLATFORM UPDATES**

### **UpdateItem Interface**
```typescript
interface UpdateItem {
  id: number;                    // Primary key
  title: string;                 // Update title
  excerpt: string;               // Short description
  content: string;               // Full update content
  author: string;                // Author name
  category: string;              // Update category
  status: 'draft' | 'published' | 'archived';  // Publication status
  publishDate: string;           // ISO date string
  readTime: string;              // e.g., "3 min read"
  views: number;                 // View count
  isPinned: boolean;             // Pin to top
  isNew: boolean;                // Show NEW badge
  tags: string[];                // Array of tags
}
```

### **Sample Update Data**
```json
{
  "id": 1,
  "title": "New Advanced Portfolio Analytics Dashboard",
  "excerpt": "Introducing comprehensive portfolio analysis tools with risk metrics, performance tracking, and detailed asset allocation insights.",
  "content": "We're excited to announce the launch of our new Advanced Portfolio Analytics Dashboard...",
  "author": "Investokid Team",
  "category": "Feature Release",
  "status": "published",
  "publishDate": "2024-12-18",
  "readTime": "3 min read",
  "views": 2500,
  "isPinned": true,
  "isNew": true,
  "tags": ["portfolio", "analytics", "dashboard"]
}
```

### **Update Categories Used**
- "Feature Release"
- "App Update"
- "Platform Enhancement"
- "Security Update"
- "Performance Update"
- "Content Update"
- "Developer Update"
- "AI Enhancement"
- "Community Feature"
- "Crypto Update"
- "UI Update"
- "Tax Feature"

---

## 📈 **5. MARKET DATA**

### **MarketData Interface**
```typescript
interface MarketData {
  symbol: string;                // Stock/Index symbol
  price: number;                 // Current price
  change: number;                // Price change
  changePercent: number;         // Percentage change
  lastUpdate: string;            // ISO timestamp
}
```

### **Sample Market Data**
```json
{
  "symbol": "NSEI",
  "price": 19567.89,
  "change": 245.67,
  "changePercent": 1.27,
  "lastUpdate": "2024-12-15T10:30:00Z"
}
```

---

## 📊 **6. ANALYTICS DATA**

### **Analytics Interfaces**
```typescript
interface AnalyticsStats {
  totalPageViews: number;
  uniqueVisitors: number;
  articlesRead: number;
  bounceRate: number;
  avgSessionDuration: number;
}

interface TopPage {
  page: string;                  // Page URL
  views: number;                 // View count
  title: string;                 // Page title
}

interface TrafficSource {
  source: string;                // Source name
  visitors: number;              // Visitor count
  percentage: number;            // Percentage of total
}

interface DeviceStats {
  device: string;                // Device type
  users: number;                 // User count
  percentage: number;            // Percentage of total
}
```

---

## 🛠️ **7. SETTINGS DATA**

### **Settings Interface**
```typescript
interface PlatformSettings {
  // General Settings
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  timezone: string;
  language: string;
  
  // Notification Settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  userRegistrations: boolean;
  newComments: boolean;
  
  // Security Settings
  twoFactorAuth: boolean;
  sessionTimeout: number;        // Minutes
  passwordExpiry: number;        // Days
  loginAttempts: number;         // Max attempts
  
  // API Settings
  newsApiKey: string;
  marketDataApi: string;
  emailServiceKey: string;
  
  // Content Settings
  articlesPerPage: number;
  autoSave: boolean;
  moderateComments: boolean;
  allowGuestComments: boolean;
  
  // Theme Settings
  primaryColor: string;          // Hex color
  secondaryColor: string;        // Hex color
  darkMode: boolean;
  customCss: string;             // Custom CSS
}
```

---

## 🗄️ **DATABASE SCHEMA RECOMMENDATIONS**

### **Tables to Create:**

#### **1. articles**
```sql
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  author VARCHAR(100),
  category VARCHAR(50),
  status VARCHAR(20) DEFAULT 'draft',
  publish_date DATE,
  read_time VARCHAR(20),
  views INTEGER DEFAULT 0,
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **2. content_blocks**
```sql
CREATE TABLE content_blocks (
  id VARCHAR(50) PRIMARY KEY,
  article_id INTEGER REFERENCES articles(id),
  type VARCHAR(20) NOT NULL,
  content TEXT,
  metadata JSON,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **3. news_items**
```sql
CREATE TABLE news_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  source VARCHAR(100),
  author VARCHAR(100),
  category VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active',
  publish_date DATE,
  external_link VARCHAR(500),
  views INTEGER DEFAULT 0,
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **4. users**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  status VARCHAR(20) DEFAULT 'active',
  join_date DATE DEFAULT CURRENT_DATE,
  last_login TIMESTAMP,
  articles_read INTEGER DEFAULT 0,
  subscription_type VARCHAR(20) DEFAULT 'free',
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **5. platform_updates**
```sql
CREATE TABLE platform_updates (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  author VARCHAR(100),
  category VARCHAR(50),
  status VARCHAR(20) DEFAULT 'draft',
  publish_date DATE,
  read_time VARCHAR(20),
  views INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT TRUE,
  tags JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **6. platform_settings**
```sql
CREATE TABLE platform_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type VARCHAR(20), -- 'string', 'number', 'boolean', 'json'
  category VARCHAR(50),      -- 'general', 'security', 'api', etc.
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔌 **API ENDPOINTS NEEDED**

### **Articles API**
```
GET    /api/articles                    // Get all articles (with filters)
GET    /api/articles/:id               // Get single article
POST   /api/articles                   // Create new article
PUT    /api/articles/:id               // Update article
DELETE /api/articles/:id               // Delete article
GET    /api/articles/category/:category // Get articles by category
```

### **News API**
```
GET    /api/news                       // Get all news items
GET    /api/news/:id                   // Get single news item
POST   /api/news                       // Create news item
PUT    /api/news/:id                   // Update news item
DELETE /api/news/:id                   // Delete news item
POST   /api/news/refresh               // Refresh from external sources
```

### **Users API**
```
GET    /api/users                      // Get all users
GET    /api/users/:id                  // Get single user
POST   /api/users                      // Create user
PUT    /api/users/:id                  // Update user
DELETE /api/users/:id                  // Delete user
PUT    /api/users/:id/status           // Update user status
```

### **Updates API**
```
GET    /api/updates                    // Get all updates
GET    /api/updates/:id                // Get single update
POST   /api/updates                    // Create update
PUT    /api/updates/:id                // Update update
DELETE /api/updates/:id                // Delete update
PUT    /api/updates/:id/pin            // Toggle pin status
```

### **Analytics API**
```
GET    /api/analytics/overview         // Dashboard stats
GET    /api/analytics/traffic          // Traffic data
GET    /api/analytics/content          // Content performance
GET    /api/analytics/users            // User analytics
```

### **Settings API**
```
GET    /api/settings                   // Get all settings
PUT    /api/settings                   // Update settings
GET    /api/settings/:category         // Get settings by category
```

---

## 📋 **QUERY PARAMETERS FOR FILTERING**

### **Articles Filtering**
```
GET /api/articles?status=published&category=Investment%20Basics&page=1&limit=10&search=investing
```

### **News Filtering**
```
GET /api/news?status=active&source=Economic%20Times&category=Market%20News&page=1&limit=20
```

### **Users Filtering**
```
GET /api/users?role=user&status=active&subscription=premium&page=1&limit=10&search=john
```

### **Updates Filtering**
```
GET /api/updates?status=published&category=Feature%20Release&pinned=true&page=1&limit=10
```

---

## 🔄 **FRONTEND DATA FLOW**

### **1. Data Fetching Pattern**
```typescript
// Example: Fetching articles
const fetchArticles = async () => {
  setLoading(true);
  try {
    const response = await fetch('/api/articles?status=published');
    const data = await response.json();
    setArticles(data);
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Fallback to mock data
    setArticles(mockArticles);
  } finally {
    setLoading(false);
  }
};
```

### **2. CRUD Operations Pattern**
```typescript
// Create
const createArticle = async (articleData) => {
  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData)
  });
  return response.json();
};

// Update
const updateArticle = async (id, articleData) => {
  const response = await fetch(`/api/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articleData)
  });
  return response.json();
};

// Delete
const deleteArticle = async (id) => {
  await fetch(`/api/articles/${id}`, { method: 'DELETE' });
};
```

---

## 📊 **STATISTICS CALCULATIONS**

### **Category Statistics (Calculated in Frontend)**
```typescript
const getCategoryStats = (category: string) => {
  const categoryArticles = articles.filter(article => 
    article.status === 'published' && 
    article.category === category
  );
  
  return {
    count: categoryArticles.length,
    totalViews: categoryArticles.reduce((sum, article) => sum + article.views, 0),
    avgReadTime: Math.round(
      categoryArticles.reduce((sum, article) => {
        const time = parseInt(article.readTime.split(' ')[0]);
        return sum + time;
      }, 0) / categoryArticles.length
    ),
    latestUpdate: new Date(
      Math.max(...categoryArticles.map(a => new Date(a.publishDate).getTime()))
    )
  };
};
```

### **Recent Topics (Calculated in Frontend)**
```typescript
const getRecentTopics = (category: string): string[] => {
  return articles
    .filter(article => 
      article.status === 'published' && 
      article.category === category
    )
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 4)
    .map(article => article.title);
};
```

---

## 🔍 **SEARCH & FILTERING LOGIC**

### **Frontend Search Implementation**
```typescript
const filteredArticles = articles.filter(article => {
  const matchesSearch = searchTerm === '' || 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const matchesCategory = activeCategory === 'all' || 
    article.category === getCategoryName(activeCategory);
  
  const matchesStatus = article.status === 'published';
  
  return matchesSearch && matchesCategory && matchesStatus;
});
```

---

## 📱 **RESPONSIVE DATA DISPLAY**

### **Pagination Logic**
```typescript
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
```

### **Loading States**
```typescript
// Show skeleton loading while fetching
{loading && data.length === 0 ? (
  <SkeletonLoader />
) : (
  <DataDisplay data={data} />
)}
```

---

## 🎯 **BACKEND INTEGRATION CHECKLIST**

### **✅ Required API Endpoints**
- [ ] Articles CRUD with content blocks
- [ ] News management with external links
- [ ] User management with roles
- [ ] Platform updates with pinning
- [ ] Analytics data aggregation
- [ ] Settings management

### **✅ Database Features Needed**
- [ ] Full-text search on articles/news
- [ ] Category-based filtering
- [ ] Status-based queries
- [ ] View count tracking
- [ ] Tag system with JSON storage
- [ ] User role permissions

### **✅ Additional Features**
- [ ] Image upload handling
- [ ] Video URL validation
- [ ] Email notification system
- [ ] User authentication
- [ ] Admin session management
- [ ] Backup and restore

---

## 🚀 **READY FOR BACKEND**

This documentation provides the **exact data structure** your backend needs to implement. The frontend is designed to seamlessly work with these APIs once they're ready!

**Next Steps:**
1. Create database tables using the provided schemas
2. Implement REST API endpoints
3. Replace mock data with actual API calls
4. Add authentication middleware
5. Implement file upload for images

The frontend will work perfectly with your backend once these structures are implemented! 🎉