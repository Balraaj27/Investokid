/*
  # Create Platform Updates Table

  1. New Tables
    - `platform_updates`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `excerpt` (text)
      - `content` (text)
      - `author` (text)
      - `category` (text)
      - `status` (text, default 'draft')
      - `publish_date` (date)
      - `read_time` (text)
      - `views` (integer, default 0)
      - `is_pinned` (boolean, default false)
      - `is_new` (boolean, default true)
      - `tags` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `platform_updates` table
    - Add policy for public read access to published updates
    - Add policy for authenticated users to manage updates
*/

CREATE TABLE IF NOT EXISTS platform_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  content text,
  author text,
  category text,
  status text DEFAULT 'draft',
  publish_date date DEFAULT CURRENT_DATE,
  read_time text DEFAULT '3 min read',
  views integer DEFAULT 0,
  is_pinned boolean DEFAULT false,
  is_new boolean DEFAULT true,
  tags jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE platform_updates ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published updates
CREATE POLICY "Public can read published updates"
  ON platform_updates
  FOR SELECT
  TO public
  USING (status = 'published');

-- Allow authenticated users to manage all updates
CREATE POLICY "Authenticated users can manage updates"
  ON platform_updates
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_updates_category ON platform_updates(category);
CREATE INDEX IF NOT EXISTS idx_updates_status ON platform_updates(status);
CREATE INDEX IF NOT EXISTS idx_updates_is_pinned ON platform_updates(is_pinned);
CREATE INDEX IF NOT EXISTS idx_updates_publish_date ON platform_updates(publish_date);

-- Insert sample platform updates
INSERT INTO platform_updates (title, excerpt, content, author, category, status, publish_date, read_time, views, is_pinned, is_new, tags) VALUES
(
  'New Advanced Portfolio Analytics Dashboard',
  'Introducing comprehensive portfolio analysis tools with risk metrics, performance tracking, and detailed asset allocation insights for better investment decisions.',
  'We''re excited to announce the launch of our new Advanced Portfolio Analytics Dashboard...',
  'Investokid Team',
  'Feature Release',
  'published',
  '2024-12-18',
  '3 min read',
  2500,
  true,
  true,
  '["portfolio", "analytics", "dashboard"]'::jsonb
),
(
  'Enhanced Mobile App Experience',
  'Redesigned mobile interface with improved navigation, faster loading times, and new touch-friendly financial calculators.',
  'Our mobile app has received a major update focusing on user experience...',
  'Development Team',
  'App Update',
  'published',
  '2024-12-15',
  '2 min read',
  1800,
  false,
  true,
  '["mobile", "app", "ui"]'::jsonb
),
(
  'Real-time Market Data Integration',
  'Now featuring live market data from NSE and BSE with real-time price updates and advanced charting capabilities.',
  'We''ve integrated real-time market data to provide you with the most current information...',
  'Data Team',
  'Platform Enhancement',
  'published',
  '2024-12-12',
  '4 min read',
  3200,
  false,
  false,
  '["market data", "real-time", "charts"]'::jsonb
),
(
  'Security Enhancement: Two-Factor Authentication',
  'Enhanced account security with mandatory 2FA implementation and advanced encryption protocols.',
  'Security is our top priority. We''ve implemented two-factor authentication...',
  'Security Team',
  'Security Update',
  'published',
  '2024-12-08',
  '3 min read',
  1500,
  false,
  false,
  '["security", "2fa", "authentication"]'::jsonb
),
(
  'New Educational Video Series Launch',
  'Comprehensive video tutorials covering advanced investment strategies, technical analysis, and market fundamentals.',
  'Our new educational video series is designed to help you master investment concepts...',
  'Education Team',
  'Content Update',
  'published',
  '2024-12-10',
  '2 min read',
  900,
  false,
  false,
  '["education", "videos", "tutorials"]'::jsonb
);