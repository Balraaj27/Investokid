/*
  # Create Analytics Tables

  1. New Tables
    - `analytics_stats`
      - `id` (uuid, primary key)
      - `date` (date, required)
      - `page_views` (integer, default 0)
      - `unique_visitors` (integer, default 0)
      - `articles_read` (integer, default 0)
      - `bounce_rate` (decimal)
      - `avg_session_duration` (integer)
      - `created_at` (timestamp)

    - `page_analytics`
      - `id` (uuid, primary key)
      - `page_path` (text, required)
      - `page_title` (text)
      - `views` (integer, default 0)
      - `date` (date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on analytics tables
    - Add policy for authenticated users to read analytics
*/

CREATE TABLE IF NOT EXISTS analytics_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL DEFAULT CURRENT_DATE,
  page_views integer DEFAULT 0,
  unique_visitors integer DEFAULT 0,
  articles_read integer DEFAULT 0,
  bounce_rate decimal(5,2) DEFAULT 0.00,
  avg_session_duration integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS page_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  page_title text,
  views integer DEFAULT 0,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read analytics
CREATE POLICY "Authenticated users can read analytics"
  ON analytics_stats
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read page analytics"
  ON page_analytics
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_stats(date);
CREATE INDEX IF NOT EXISTS idx_page_analytics_path ON page_analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_page_analytics_date ON page_analytics(date);

-- Insert sample analytics data
INSERT INTO analytics_stats (date, page_views, unique_visitors, articles_read, bounce_rate, avg_session_duration) VALUES
('2024-12-15', 125847, 45231, 89456, 32.10, 245),
('2024-12-14', 118234, 42156, 85234, 33.20, 238),
('2024-12-13', 112456, 39876, 82145, 34.50, 232);

INSERT INTO page_analytics (page_path, page_title, views, date) VALUES
('/investment-basics', 'Investment Basics', 15420, '2024-12-15'),
('/technical-analysis', 'Technical Analysis', 12350, '2024-12-15'),
('/financial-planning', 'Financial Planning', 9870, '2024-12-15'),
('/cryptocurrency', 'Cryptocurrency', 8540, '2024-12-15'),
('/blog/what-is-investing', 'What is Investing?', 7230, '2024-12-15');