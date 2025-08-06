import { useState, useEffect, useCallback } from 'react';
import { fetchFinancialNews, NewsItem } from '../services/newsService';

interface UseFinancialNewsReturn {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  refetch: () => void;
}

export const useFinancialNews = (
  refreshInterval: number = 300000 // 5 minutes default
): UseFinancialNewsReturn => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const financialNews = await fetchFinancialNews();
      setNews(financialNews);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch financial news');
      console.error('Financial news fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    // Initial fetch
    fetchNews();

    // Set up interval for periodic updates
    const interval = setInterval(fetchNews, refreshInterval);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [fetchNews, refreshInterval]);

  return {
    news,
    loading,
    error,
    lastUpdate,
    refetch
  };
};