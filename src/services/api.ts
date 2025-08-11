import { supabase } from '../lib/supabase';
import type { 
  Article, 
  NewsItem, 
  PlatformUser, 
  PlatformUpdate, 
  AnalyticsStats, 
  PageAnalytics, 
  PlatformSetting 
} from '../lib/supabase';

// Articles API
export const articlesAPI = {
  // Get all articles with optional filters
  async getAll(filters?: {
    status?: string;
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured - using mock data');
    }

    let query = supabase
      .from('articles')
      .select('*')
      .order('publish_date', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,author.ilike.%${filters.search}%`);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Article[];
  },

  // Get single article
  async getById(id: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Article;
  },

  // Create new article
  async create(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single();
    
    if (error) throw error;
    return data as Article;
  },

  // Update article
  async update(id: string, updates: Partial<Article>) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('articles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Article;
  },

  // Delete article
  async delete(id: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Increment view count
  async incrementViews(id: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase.rpc('increment_article_views', { article_id: id });
    if (error) throw error;
  },

  // Get articles by category
  async getByCategory(category: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('publish_date', { ascending: false });
    
    if (error) throw error;
    return data as Article[];
  }
};

// News API
export const newsAPI = {
  // Get all news with filters
  async getAll(filters?: {
    status?: string;
    source?: string;
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured - using mock data');
    }

    let query = supabase
      .from('news_items')
      .select('*')
      .order('publish_date', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.source) {
      query = query.eq('source', filters.source);
    }
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as NewsItem[];
  },

  // Create news item
  async create(news: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('news_items')
      .insert([news])
      .select()
      .single();
    
    if (error) throw error;
    return data as NewsItem;
  },

  // Update news item
  async update(id: string, updates: Partial<NewsItem>) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('news_items')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as NewsItem;
  },

  // Delete news item
  async delete(id: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('news_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Increment view count
  async incrementViews(id: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase.rpc('increment_news_views', { news_id: id });
    if (error) throw error;
  }
};

// Users API
export const usersAPI = {
  // Get all users with filters
  async getAll(filters?: {
    role?: string;
    status?: string;
    subscription?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured - using mock data');
    }

    let query = supabase
      .from('platform_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.role) {
      query = query.eq('role', filters.role);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.subscription) {
      query = query.eq('subscription_type', filters.subscription);
    }
    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as PlatformUser[];
  },

  // Create user
  async create(user: Omit<PlatformUser, 'id' | 'created_at' | 'updated_at'>) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('platform_users')
      .insert([user])
      .select()
      .single();
    
    if (error) throw error;
    return data as PlatformUser;
  },

  // Update user
  async update(id: string, updates: Partial<PlatformUser>) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('platform_users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as PlatformUser;
  },

  // Delete user
  async delete(id: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('platform_users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Platform Updates API
export const updatesAPI = {
  // Get all updates with filters
  async getAll(filters?: {
    status?: string;
    category?: string;
    pinned?: boolean;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured - using mock data');
    }

    let query = supabase
      .from('platform_updates')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('publish_date', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.pinned !== undefined) {
      query = query.eq('is_pinned', filters.pinned);
    }
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as PlatformUpdate[];
  },

  // Create update
  async create(update: Omit<PlatformUpdate, 'id' | 'created_at' | 'updated_at'>) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('platform_updates')
      .insert([update])
      .select()
      .single();
    
    if (error) throw error;
    return data as PlatformUpdate;
  },

  // Update platform update
  async update(id: string, updates: Partial<PlatformUpdate>) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('platform_updates')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as PlatformUpdate;
  },

  // Delete update
  async delete(id: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase
      .from('platform_updates')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Toggle pin status
  async togglePin(id: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
      throw new Error('Supabase not configured');
    }

    const { data: current } = await supabase
      .from('platform_updates')
      .select('is_pinned')
      .eq('id', id)
      .single();
    
    const { data, error } = await supabase
      .from('platform_updates')
      .update({ is_pinned: !current?.is_pinned })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as PlatformUpdate;
  }
};

// Analytics API
export const analyticsAPI = {
  // Get overview stats
  async getOverviewStats() {
    const { data, error } = await supabase
      .from('analytics_stats')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .single();
    
    if (error) throw error;
    return data as AnalyticsStats;
  },

  // Get page analytics
  async getPageAnalytics(limit = 10) {
    const { data, error } = await supabase
      .from('page_analytics')
      .select('*')
      .order('views', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data as PageAnalytics[];
  },

  // Get analytics by date range
  async getStatsByDateRange(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('analytics_stats')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data as AnalyticsStats[];
  }
};

// Settings API
export const settingsAPI = {
  // Get all settings
  async getAll() {
    const { data, error } = await supabase
      .from('platform_settings')
      .select('*')
      .order('category', { ascending: true });
    
    if (error) throw error;
    return data as PlatformSetting[];
  },

  // Get settings by category
  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('platform_settings')
      .select('*')
      .eq('category', category);
    
    if (error) throw error;
    return data as PlatformSetting[];
  },

  // Update setting
  async update(key: string, value: string) {
    const { data, error } = await supabase
      .from('platform_settings')
      .update({ 
        setting_value: value, 
        updated_at: new Date().toISOString() 
      })
      .eq('setting_key', key)
      .select()
      .single();
    
    if (error) throw error;
    return data as PlatformSetting;
  },

  // Bulk update settings
  async bulkUpdate(settings: { key: string; value: string }[]) {
    const updates = settings.map(setting => ({
      setting_key: setting.key,
      setting_value: setting.value,
      updated_at: new Date().toISOString()
    }));

    const { data, error } = await supabase
      .from('platform_settings')
      .upsert(updates, { onConflict: 'setting_key' })
      .select();
    
    if (error) throw error;
    return data as PlatformSetting[];
  }
};

// Utility functions
export const incrementViews = async (table: string, id: string) => {
  const { error } = await supabase
    .from(table)
    .update({ views: supabase.sql`views + 1` })
    .eq('id', id);
  
  if (error) throw error;
};

// Search across all content
export const globalSearch = async (query: string, limit = 20) => {
  const [articles, news, updates] = await Promise.all([
    articlesAPI.getAll({ search: query, status: 'published', limit: limit / 3 }),
    newsAPI.getAll({ search: query, status: 'active', limit: limit / 3 }),
    updatesAPI.getAll({ search: query, status: 'published', limit: limit / 3 })
  ]);

  return {
    articles,
    news,
    updates,
    total: articles.length + news.length + updates.length
  };
};