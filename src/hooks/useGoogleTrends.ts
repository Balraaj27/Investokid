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

export const useGoogleTrends = (refreshInterval: number = 0): UseGoogleTrendsReturn => {
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchTrends = useCallback(async () => {
    // Prevent infinite API calls
    if (hasAttemptedFetch) {
      console.log('🛑 Google Trends already fetched, skipping...');
      return;
    }
    
    try {
      console.log('🔄 Fetching Google Trends...');
      setLoading(true);
      setError(null);
      
      // DISABLED: Google Trends API to prevent infinite calls
      console.log('⚠️ Google Trends API disabled - using fallback data');
      throw new Error('Google Trends API disabled');
      
    } catch (err) {
      console.warn('🔄 Using fallback trends data');
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
      setHasAttemptedFetch(true);
    } finally {
      setLoading(false);
    }
  }, [hasAttemptedFetch]);

  const refetch = useCallback(() => {
    console.log('🔄 Manual Google Trends refetch');
    setHasAttemptedFetch(false);
    fetchTrends();
  }, [fetchTrends]);

  useEffect(() => {
    console.log('🎯 useGoogleTrends effect triggered');
    fetchTrends();
  }, [fetchTrends, refreshInterval]);

  return {
    trends,
    loading,
    error,
    lastUpdate,
    refetch
  };
};