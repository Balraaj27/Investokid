import { useState, useEffect, useCallback } from 'react';
import { articlesAPI } from '../services/api';
import type { Article } from '../lib/supabase';
import { mockArticles } from '../data/mockData';

interface UseArticlesOptions {
  category?: string;
  status?: string;
  search?: string;
  limit?: number;
  autoRefresh?: boolean;
}

interface UseArticlesReturn {
  articles: Article[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createArticle: (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => Promise<Article>;
  updateArticle: (id: string, updates: Partial<Article>) => Promise<Article>;
  deleteArticle: (id: string) => Promise<void>;
  incrementViews: (id: string) => Promise<void>;
}

export const useArticles = (options: UseArticlesOptions = {}): UseArticlesReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchArticles = useCallback(async () => {
    if (hasAttemptedFetch && articles.length > 0) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await articlesAPI.getAll({
        category: options.category,
        status: options.status || 'published',
        search: options.search,
        limit: options.limit
      });
      
      setArticles(data);
      setHasAttemptedFetch(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      console.error('Error fetching articles:', err);
      // Use mock data as fallback
      setArticles(mockArticles.filter(a => a.status === 'published'));
      setHasAttemptedFetch(true);
    } finally {
      setLoading(false);
    }
  }, [options.category, options.status, options.search, options.limit, hasAttemptedFetch, articles.length]);

  const refetch = useCallback(() => {
    setHasAttemptedFetch(false);
    fetchArticles();
  }, [fetchArticles]);

  const createArticle = useCallback(async (articleData: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newArticle = await articlesAPI.create(articleData);
      setArticles(prev => [newArticle, ...prev]);
      return newArticle;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create article');
      throw err;
    }
  }, []);

  const updateArticle = useCallback(async (id: string, updates: Partial<Article>) => {
    try {
      const updatedArticle = await articlesAPI.update(id, updates);
      setArticles(prev => prev.map(article => 
        article.id === id ? updatedArticle : article
      ));
      return updatedArticle;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update article');
      throw err;
    }
  }, []);

  const deleteArticle = useCallback(async (id: string) => {
    try {
      await articlesAPI.delete(id);
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
      throw err;
    }
  }, []);

  const incrementViews = useCallback(async (id: string) => {
    try {
      await articlesAPI.incrementViews(id);
      setArticles(prev => prev.map(article => 
        article.id === id ? { ...article, views: article.views + 1 } : article
      ));
    } catch (err) {
      console.error('Error incrementing views:', err);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);


  return {
    articles,
    loading,
    error,
    refetch,
    createArticle,
    updateArticle,
    deleteArticle,
    incrementViews
  };
};