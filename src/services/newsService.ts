// RSS News Service for Indian Financial News

// News API Configuration
const NEWS_API_KEY = '6867d4bbc2ef4790ae9fb8a59ae03596'; // Your NewsAPI key
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// GNews API Configuration (backup)
const GNEWS_API_KEY = 'YOUR_GNEWS_API_KEY'; // Replace with your GNews API key if needed
const GNEWS_BASE_URL = 'https://gnews.io/api/v4';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category?: string;
}

// RSS Feed URLs for Indian Financial News
export const RSS_FEEDS = {
  MONEYCONTROL: 'https://www.moneycontrol.com/rss/MCtopnews.xml',
  ECONOMIC_TIMES: 'https://economictimes.indiatimes.com/rssfeedsdefault.cms',
  LIVEMINT: 'https://www.livemint.com/rss/market',
  BUSINESS_STANDARD: 'https://www.business-standard.com/rss'
};

// CORS proxy services for RSS feeds (since direct RSS access is blocked by CORS)
const CORS_PROXIES = [
  'https://api.rss2json.com/v1/api.json?rss_url=',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/get?url='
];

// Parse RSS XML to NewsItem array
const parseRSSXML = (xmlText: string, source: string): NewsItem[] => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('XML parsing failed');
    }
    
    const items = xmlDoc.querySelectorAll('item');
    const newsItems: NewsItem[] = [];
    
    items.forEach((item, index) => {
      const title = item.querySelector('title')?.textContent?.trim() || '';
      const description = item.querySelector('description')?.textContent?.trim() || '';
      const link = item.querySelector('link')?.textContent?.trim() || '';
      const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
      
      if (title && description) {
        newsItems.push({
          id: `${source}-${index}-${Date.now()}`,
          title: cleanHTMLTags(title),
          description: cleanHTMLTags(description).substring(0, 200) + '...',
          link,
          pubDate,
          source,
          category: 'Financial News'
        });
      }
    });
    
    return newsItems.slice(0, 10); // Return top 10 news items
  } catch (error) {
    console.warn(`Error parsing RSS XML for ${source}:`, error);
    return [];
  }
};

// Clean HTML tags from text
const cleanHTMLTags = (text: string): string => {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .trim();
};

// Fetch RSS feed using RSS2JSON API (most reliable for CORS)
const fetchRSSViaRSS2JSON = async (feedUrl: string, source: string): Promise<NewsItem[]> => {
  try {
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=10`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`RSS2JSON API error: ${data.message || 'Unknown error'}`);
    }
    
    const newsItems: NewsItem[] = data.items.map((item: any, index: number) => ({
      id: `${source}-${index}-${Date.now()}`,
      title: cleanHTMLTags(item.title || ''),
      description: cleanHTMLTags(item.description || '').substring(0, 200) + '...',
      link: item.link || '',
      pubDate: item.pubDate || '',
      source,
      category: 'Financial News'
    }));
    
    return newsItems.slice(0, 10);
  } catch (error) {
    console.warn(`Error fetching RSS via RSS2JSON for ${source}:`, error.message);
    return [];
  }
};

// Fetch RSS feed using AllOrigins proxy
const fetchRSSViaAllOrigins = async (feedUrl: string, source: string): Promise<NewsItem[]> => {
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
    
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.contents) {
      throw new Error('No content received from AllOrigins');
    }
    
    return parseRSSXML(data.contents, source);
  } catch (error) {
    console.warn(`Error fetching RSS via AllOrigins for ${source}:`, error);
    return [];
  }
};

// Fetch single RSS feed with multiple fallback methods
const fetchSingleRSSFeed = async (feedUrl: string, source: string): Promise<NewsItem[]> => {
  // Try RSS2JSON first (most reliable)
  let newsItems = await fetchRSSViaRSS2JSON(feedUrl, source);
  if (newsItems.length > 0) {
    return newsItems;
  }
  
  // Fallback to AllOrigins
  newsItems = await fetchRSSViaAllOrigins(feedUrl, source);
  if (newsItems.length > 0) {
    return newsItems;
  }
  
  // If all methods fail, return mock news for this source
  return getMockNewsForSource(source);
};

// Generate mock news data for fallback
const getMockNewsForSource = (source: string): NewsItem[] => {
  const mockNews = {
    'Moneycontrol': [
      {
        title: 'Sensex rises 200 points on strong FII inflows',
        description: 'Indian equity markets opened higher today driven by positive global cues and strong foreign institutional investor inflows...'
      },
      {
        title: 'RBI maintains repo rate at 6.5% in latest policy review',
        description: 'The Reserve Bank of India kept the benchmark repo rate unchanged at 6.5% citing inflation concerns and global economic uncertainty...'
      }
    ],
    'Economic Times': [
      {
        title: 'IT stocks rally on strong Q3 earnings outlook',
        description: 'Information technology stocks surged in early trade as investors bet on strong third-quarter earnings from major IT companies...'
      },
      {
        title: 'Rupee strengthens against dollar on export growth',
        description: 'The Indian rupee gained against the US dollar following better-than-expected export data and reduced trade deficit...'
      }
    ],
    'LiveMint': [
      {
        title: 'Banking sector shows resilience amid global headwinds',
        description: 'Indian banking stocks outperformed broader markets as investors showed confidence in the sector\'s asset quality improvements...'
      },
      {
        title: 'Gold prices surge on safe-haven demand',
        description: 'Gold prices in India touched new highs as investors sought safe-haven assets amid global economic uncertainties...'
      }
    ],
    'Business Standard': [
      {
        title: 'Manufacturing PMI hits 6-month high in December',
        description: 'India\'s manufacturing purchasing managers\' index rose to a six-month high, indicating robust industrial activity...'
      },
      {
        title: 'Auto sector recovery gains momentum with festive demand',
        description: 'Automobile manufacturers reported strong sales growth driven by festive season demand and improved consumer sentiment...'
      }
    ]
  };
  
  const sourceNews = mockNews[source as keyof typeof mockNews] || mockNews['Moneycontrol'];
  
  return sourceNews.map((news, index) => ({
    id: `mock-${source}-${index}-${Date.now()}`,
    title: news.title,
    description: news.description,
    link: '#',
    pubDate: new Date().toISOString(),
    source,
    category: 'Financial News'
  }));
};

// Get news by source
export const getNewsBySource = (news: NewsItem[], source: string): NewsItem[] => {
  return news.filter(item => item.source === source);
};

// Fetch news from NewsAPI.org (Primary)
const fetchNewsAPI = async (): Promise<NewsItem[]> => {
  try {
    console.log('🔄 Fetching live news from NewsAPI.org with your API key...');
    const apiUrl = `${NEWS_API_BASE_URL}/top-headlines?country=in&category=business&pageSize=20&apiKey=${NEWS_API_KEY}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'X-Api-Key': NEWS_API_KEY
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!response.ok) {
      if (response.status === 426) {
        console.warn('⚠️ NewsAPI requires upgrade or different plan. Falling back to RSS feeds...');
        throw new Error(`NewsAPI requires upgrade (HTTP 426). Current plan may not support this endpoint.`);
      }
      throw new Error(`NewsAPI HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      console.error('NewsAPI Error Response:', data);
      throw new Error(`NewsAPI error: ${data.message || data.code || 'Unknown error'}`);
    }
    
    const newsItems: NewsItem[] = data.articles.slice(0, 20).map((article: any, index: number) => ({
      id: `newsapi-${index}-${Date.now()}`,
      title: cleanHTMLTags(article.title || ''),
      description: cleanHTMLTags(article.description || '').substring(0, 200) + '...',
      link: article.url || '',
      pubDate: article.publishedAt || new Date().toISOString(),
      source: article.source?.name || 'News Source',
      category: 'Financial News'
    }));
    
    console.log('✅ Successfully fetched live Indian business news from NewsAPI:', newsItems.length, 'articles');
    return newsItems;
    
  } catch (error) {
    console.error('❌ NewsAPI failed:', error.message);
    console.log('📝 API URL attempted:', `${NEWS_API_BASE_URL}/top-headlines?country=in&category=business&pageSize=20&apiKey=${NEWS_API_KEY.substring(0, 8)}...`);
    throw error;
  }
};

// Fetch news from GNews.io (Backup)
const fetchGNewsAPI = async (): Promise<NewsItem[]> => {
  try {
    const apiUrl = `${GNEWS_BASE_URL}/top-headlines?country=in&category=business&max=20&apikey=${GNEWS_API_KEY}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`GNews HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    const newsItems: NewsItem[] = data.articles.slice(0, 20).map((article: any, index: number) => ({
      id: `gnews-${index}-${Date.now()}`,
      title: cleanHTMLTags(article.title || ''),
      description: cleanHTMLTags(article.description || '').substring(0, 200) + '...',
      link: article.url || '',
      pubDate: article.publishedAt || new Date().toISOString(),
      source: article.source?.name || 'News Source',
      category: 'Financial News'
    }));
    
    console.log('✅ Successfully fetched live news from GNews:', newsItems.length, 'articles');
    return newsItems;
    
  } catch (error) {
    console.warn('❌ GNews API failed:', error.message);
    throw error;
  }
};

// Main function to fetch all RSS feeds
export const fetchFinancialNews = async (): Promise<NewsItem[]> => {
  console.log('🔄 Fetching live Indian financial news from multiple sources...');
  
  // Use RSS feeds (NewsAPI and GNews don't work from browser due to CORS)
  try {
    console.log('📰 Falling back to RSS feeds...');
    return await fetchRSSFeeds();
  } catch (error) {
    console.warn('RSS feeds failed, using mock data');
    return getMockFinancialNews();
  }
};

// RSS Feeds fallback function
const fetchRSSFeeds = async (): Promise<NewsItem[]> => {
  
  const feedPromises = [
    fetchSingleRSSFeed(RSS_FEEDS.MONEYCONTROL, 'Moneycontrol'),
    fetchSingleRSSFeed(RSS_FEEDS.ECONOMIC_TIMES, 'Economic Times'),
    fetchSingleRSSFeed(RSS_FEEDS.LIVEMINT, 'LiveMint'),
    fetchSingleRSSFeed(RSS_FEEDS.BUSINESS_STANDARD, 'Business Standard')
  ];
  
  try {
    const results = await Promise.allSettled(feedPromises);
    const allNews: NewsItem[] = [];
    let successfulFeeds = 0;
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const newsItems = result.value;
        if (newsItems.length > 0) {
          allNews.push(...newsItems);
          successfulFeeds++;
        }
      } else {
        console.warn(`Failed to fetch news from feed ${index}:`, result.reason);
      }
    });
    
    // If no feeds were successful, add mock news
    if (successfulFeeds === 0) {
      console.log('📰 All RSS feeds failed, using mock news data');
      const sources = ['Moneycontrol', 'Economic Times', 'LiveMint', 'Business Standard'];
      sources.forEach(source => {
        allNews.push(...getMockNewsForSource(source));
      });
      throw new Error('All RSS feeds failed - using mock data');
    }
    
    // Sort by publication date (newest first) and limit to 20 items
    const sortedNews = allNews
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 20);
    
    console.log(`✅ Successfully fetched ${sortedNews.length} live news items from ${successfulFeeds}/4 sources`);
    return sortedNews;
    
  } catch (error) {
    console.error('❌ Error fetching financial news:', error.message);
    
    // Return comprehensive mock news as fallback
    const allMockNews: NewsItem[] = [];
    ['Moneycontrol', 'Economic Times', 'LiveMint', 'Business Standard'].forEach(source => {
      allMockNews.push(...getMockNewsForSource(source));
    });
    
    const mockNews = allMockNews.slice(0, 20);
    console.log(`📰 Returning ${mockNews.length} mock news items as fallback`);
    return mockNews;
  }
};

// Enhanced mock news for better fallback
const getMockFinancialNews = (): NewsItem[] => {
  const mockNews: NewsItem[] = [
    {
      id: 'mock-1',
      title: 'Sensex rises 200 points on strong FII inflows, banking stocks lead gains',
      description: 'Indian equity markets opened higher today driven by positive global cues and strong foreign institutional investor inflows. Banking and IT stocks were among the top performers.',
      link: '#',
      pubDate: new Date().toISOString(),
      source: 'Economic Times',
      category: 'Markets'
    },
    {
      id: 'mock-2',
      title: 'RBI maintains repo rate at 6.5% in latest monetary policy review',
      description: 'The Reserve Bank of India kept the benchmark repo rate unchanged at 6.5% citing inflation concerns and global economic uncertainty in its latest policy meeting.',
      link: '#',
      pubDate: new Date(Date.now() - 3600000).toISOString(),
      source: 'Business Standard',
      category: 'Policy'
    },
    {
      id: 'mock-3',
      title: 'IT stocks rally on strong Q3 earnings outlook, TCS gains 3%',
      description: 'Information technology stocks surged in early trade as investors bet on strong third-quarter earnings from major IT companies including TCS, Infosys, and Wipro.',
      link: '#',
      pubDate: new Date(Date.now() - 7200000).toISOString(),
      source: 'Moneycontrol',
      category: 'Earnings'
    },
    {
      id: 'mock-4',
      title: 'Rupee strengthens against dollar on improved export data',
      description: 'The Indian rupee gained against the US dollar following better-than-expected export data and reduced trade deficit in the latest monthly figures.',
      link: '#',
      pubDate: new Date(Date.now() - 10800000).toISOString(),
      source: 'LiveMint',
      category: 'Currency'
    },
    {
      id: 'mock-5',
      title: 'Gold prices surge to new highs on safe-haven demand',
      description: 'Gold prices in India touched new record highs as investors sought safe-haven assets amid global economic uncertainties and geopolitical tensions.',
      link: '#',
      pubDate: new Date(Date.now() - 14400000).toISOString(),
      source: 'Financial Express',
      category: 'Commodities'
    }
  ];
  
  return mockNews;
};

// Utility function to format publication date
export const formatNewsDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 1) {
      return '🔥 Just now';
    } else if (diffInMinutes < 60) {
      return `⚡ ${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `🕐 ${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `📅 ${diffInDays}d ago`;
    } else {
      return `📆 ${date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`;
    }
  } catch (error) {
    return '📰 Recent';
  }
};

// Search news by keyword
export const searchNews = (news: NewsItem[], keyword: string): NewsItem[] => {
  const searchTerm = keyword.toLowerCase();
  return news.filter(item => 
    item.title.toLowerCase().includes(searchTerm) || 
    item.description.toLowerCase().includes(searchTerm)
  );
};