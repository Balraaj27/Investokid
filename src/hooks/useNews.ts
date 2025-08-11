import { useState, useEffect, useCallback } from 'react';
import { newsAPI } from '../services/api';
import type { NewsItem } from '../lib/supabase';
import { mockNews } from '../data/mockData';

interface UseNewsOptions {
  source?: string;
  category?: string;
  status?: string;
  search?: string;
  limit?: number;
  autoRefresh?: boolean;
}

interface UseNewsReturn {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createNews: (news: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>) => Promise<NewsItem>;
  updateNews: (id: string, updates: Partial<NewsItem>) => Promise<NewsItem>;
  deleteNews: (id: string) => Promise<void>;
}

export const useNews = (options: UseNewsOptions = {}): UseNewsReturn => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchNews = useCallback(async () => {
    if (hasAttemptedFetch && news.length > 0) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await newsAPI.getAll({
        source: options.source,
        category: options.category,
        status: options.status || 'active',
        search: options.search,
        limit: options.limit
      });
      
      setNews(data);
      setHasAttemptedFetch(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      console.error('Error fetching news:', err);
      // Use mock data as fallback
      setNews(mockNews);
      setHasAttemptedFetch(true);
    } finally {
      setLoading(false);
    }
  }, [options.source, options.category, options.status, options.search, options.limit, hasAttemptedFetch, news.length]);

  const refetch = useCallback(() => {
    setHasAttemptedFetch(false);
    fetchNews();
  }, [fetchNews]);

  const createNews = useCallback(async (newsData: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newNews = await newsAPI.create(newsData);
      setNews(prev => [newNews, ...prev]);
      return newNews;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create news');
      throw err;
    }
  }, []);

  const updateNews = useCallback(async (id: string, updates: Partial<NewsItem>) => {
    try {
      const updatedNews = await newsAPI.update(id, updates);
      setNews(prev => prev.map(item => 
        item.id === id ? updatedNews : item
      ));
      return updatedNews;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update news');
      throw err;
    }
  }, []);

  const deleteNews = useCallback(async (id: string) => {
    try {
      await newsAPI.delete(id);
      setNews(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete news');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);


  return {
    news,
    loading,
    error,
    refetch,
    createNews,
    updateNews,
    deleteNews
  };
};