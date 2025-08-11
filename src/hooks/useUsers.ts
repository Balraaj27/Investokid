import { useState, useEffect, useCallback } from 'react';
import { usersAPI } from '../services/api';
import type { PlatformUser } from '../lib/supabase';
import { mockUsers } from '../data/mockData';

interface UseUsersOptions {
  role?: string;
  status?: string;
  subscription?: string;
  search?: string;
  limit?: number;
}

interface UseUsersReturn {
  users: PlatformUser[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createUser: (user: Omit<PlatformUser, 'id' | 'created_at' | 'updated_at'>) => Promise<PlatformUser>;
  updateUser: (id: string, updates: Partial<PlatformUser>) => Promise<PlatformUser>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUsers = (options: UseUsersOptions = {}): UseUsersReturn => {
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchUsers = useCallback(async () => {
    if (hasAttemptedFetch && users.length > 0) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await usersAPI.getAll({
        role: options.role,
        status: options.status,
        subscription: options.subscription,
        search: options.search,
        limit: options.limit
      });
      
      setUsers(data);
      setHasAttemptedFetch(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
      console.error('Error fetching users:', err);
      // Use mock data as fallback
      setUsers(mockUsers);
      setHasAttemptedFetch(true);
    } finally {
      setLoading(false);
    }
  }, [options.role, options.status, options.subscription, options.search, options.limit, hasAttemptedFetch, users.length]);

  const refetch = useCallback(() => {
    setHasAttemptedFetch(false);
    fetchUsers();
  }, [fetchUsers]);

  const createUser = useCallback(async (userData: Omit<PlatformUser, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newUser = await usersAPI.create(userData);
      setUsers(prev => [newUser, ...prev]);
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
      throw err;
    }
  }, []);

  const updateUser = useCallback(async (id: string, updates: Partial<PlatformUser>) => {
    try {
      const updatedUser = await usersAPI.update(id, updates);
      setUsers(prev => prev.map(user => 
        user.id === id ? updatedUser : user
      ));
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      throw err;
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    try {
      await usersAPI.delete(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    refetch,
    createUser,
    updateUser,
    deleteUser
  };
};