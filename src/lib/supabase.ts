import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  console.warn('Invalid Supabase URL. Please update your .env file with valid Supabase credentials.');
  console.warn('Using placeholder values. Connect to Supabase to enable backend functionality.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  publish_date: string;
  read_time: string;
  views: number;
  tags: string[];
  content_blocks: ContentBlock[];
  created_at: string;
  updated_at: string;
}

export interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'video' | 'quote' | 'list' | 'code';
  content: string;
  metadata?: {
    level?: number;
    alt?: string;
    caption?: string;
    url?: string;
    listType?: 'ordered' | 'unordered';
    language?: string;
    alignment?: 'left' | 'center' | 'right';
  };
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  source: string;
  author: string;
  category: string;
  status: 'active' | 'inactive' | 'featured';
  publish_date: string;
  external_link: string;
  views: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user' | 'subscriber';
  status: 'active' | 'inactive' | 'banned';
  join_date: string;
  last_login: string;
  articles_read: number;
  subscription_type: 'free' | 'premium' | 'pro';
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface PlatformUpdate {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  publish_date: string;
  read_time: string;
  views: number;
  is_pinned: boolean;
  is_new: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface AnalyticsStats {
  id: string;
  date: string;
  page_views: number;
  unique_visitors: number;
  articles_read: number;
  bounce_rate: number;
  avg_session_duration: number;
  created_at: string;
}

export interface PageAnalytics {
  id: string;
  page_path: string;
  page_title: string;
  views: number;
  date: string;
  created_at: string;
}

export interface PlatformSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: 'string' | 'number' | 'boolean' | 'json';
  category: string;
  description: string;
  updated_at: string;
}