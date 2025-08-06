import { useState, useEffect, useCallback } from 'react';

interface TrendItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

interface UseGoogleTrendsReturn {
  trends: TrendItem[];
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  refetch: () => void;
}

export const useGoogleTrends = (refreshInterval: number = 300000): UseGoogleTrendsReturn => {
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchTrends = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use RSS2JSON to convert Google Trends RSS to JSON
      const rssUrl = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN';
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=10`;
      
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
      
      const trendItems: TrendItem[] = data.items.slice(0, 5).map((item: any) => ({
        title: item.title || 'Trending Topic',
        link: item.link || '#',
        pubDate: item.pubDate || new Date().toISOString(),
        description: item.description || 'Popular search trend in India'
      }));
      
      setTrends(trendItems);
      setLastUpdate(new Date());
      console.log('✅ Successfully fetched Google Trends data:', trendItems.length, 'items');
      
    } catch (err) {
      console.warn('❌ Google Trends API failed, using fallback data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch trends');
      
      // Fallback trending topics for India
      const fallbackTrends: TrendItem[] = [
        {
          title: 'Nifty 50 Today',
          link: 'https://www.google.com/search?q=nifty+50+today',
          pubDate: new Date().toISOString(),
          description: 'Stock market index performance'
        },
        {
          title: 'Bank Nifty Today',
          link: 'https://www.google.com/search?q=bank+nifty+today',
          pubDate: new Date().toISOString(),
          description: 'Banking sector index performance'
        },
        {
          title: 'Mutual Fund NAV',
          link: 'https://www.google.com/search?q=mutual+fund+nav',
          pubDate: new Date().toISOString(),
          description: 'Net Asset Value of mutual funds'
        },
        {
          title: 'Gold Rate Today',
          link: 'https://www.google.com/search?q=gold+rate+today',
          pubDate: new Date().toISOString(),
          description: 'Current gold prices in India'
        },
        {
          title: 'IPO Allotment Status',
          link: 'https://www.google.com/search?q=ipo+allotment+status',
          pubDate: new Date().toISOString(),
          description: 'Initial Public Offering updates'
        }
      ];
      
      setTrends(fallbackTrends);
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchTrends();
  }, [fetchTrends]);

  useEffect(() => {
    // Initial fetch
    fetchTrends();

    // Set up interval for periodic updates
    const interval = setInterval(fetchTrends, refreshInterval);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [fetchTrends, refreshInterval]);

  return {
    trends,
    loading,
    error,
    lastUpdate,
    refetch
  };
};