import { useState, useEffect, useCallback } from 'react';
import { updatesAPI } from '../services/api';
import type { PlatformUpdate } from '../lib/supabase';
import { mockUpdates } from '../data/mockData';

interface UsePlatformUpdatesOptions {
  category?: string;
  status?: string;
  pinned?: boolean;
  search?: string;
  limit?: number;
}

interface UsePlatformUpdatesReturn {
  updates: PlatformUpdate[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createUpdate: (update: Omit<PlatformUpdate, 'id' | 'created_at' | 'updated_at'>) => Promise<PlatformUpdate>;
  updateUpdate: (id: string, updates: Partial<PlatformUpdate>) => Promise<PlatformUpdate>;
  deleteUpdate: (id: string) => Promise<void>;
  togglePin: (id: string) => Promise<PlatformUpdate>;
}

export const usePlatformUpdates = (options: UsePlatformUpdatesOptions = {}): UsePlatformUpdatesReturn => {
  const [updates, setUpdates] = useState<PlatformUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchUpdates = useCallback(async () => {
    if (hasAttemptedFetch && updates.length > 0) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await updatesAPI.getAll({
        category: options.category,
        status: options.status || 'published',
        pinned: options.pinned,
        search: options.search,
        limit: options.limit
      });
      
      setUpdates(data);
      setHasAttemptedFetch(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch updates');
      console.error('Error fetching updates:', err);
      // Use mock data as fallback
      setUpdates(mockUpdates.filter(u => u.status === 'published'));
      setHasAttemptedFetch(true);
    } finally {
      setLoading(false);
    }
  }, [options.category, options.status, options.pinned, options.search, options.limit, hasAttemptedFetch, updates.length]);

  const refetch = useCallback(() => {
    setHasAttemptedFetch(false);
    fetchUpdates();
  }, [fetchUpdates]);

  const createUpdate = useCallback(async (updateData: Omit<PlatformUpdate, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newUpdate = await updatesAPI.create(updateData);
      setUpdates(prev => [newUpdate, ...prev]);
      return newUpdate;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create update');
      throw err;
    }
  }, []);

  const updateUpdate = useCallback(async (id: string, updateData: Partial<PlatformUpdate>) => {
    try {
      const updatedUpdate = await updatesAPI.update(id, updateData);
      setUpdates(prev => prev.map(update => 
        update.id === id ? updatedUpdate : update
      ));
      return updatedUpdate;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update update');
      throw err;
    }
  }, []);

  const deleteUpdate = useCallback(async (id: string) => {
    try {
      await updatesAPI.delete(id);
      setUpdates(prev => prev.filter(update => update.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete update');
      throw err;
    }
  }, []);

  const togglePin = useCallback(async (id: string) => {
    try {
      const updatedUpdate = await updatesAPI.togglePin(id);
      setUpdates(prev => prev.map(update => 
        update.id === id ? updatedUpdate : update
      ));
      return updatedUpdate;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle pin');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchUpdates();
  }, [fetchUpdates]);

  return {
    updates,
    loading,
    error,
    refetch,
    createUpdate,
    updateUpdate,
    deleteUpdate,
    togglePin
  };
};