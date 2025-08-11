/*
  # Create News Table

  1. New Tables
    - `news_items`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text)
      - `content` (text)
      - `source` (text)
      - `author` (text)
      - `category` (text)
      - `status` (text, default 'active')
      - `publish_date` (date)
      - `external_link` (text)
      - `views` (integer, default 0)
      - `tags` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `news_items` table
    - Add policy for public read access to active news
    - Add policy for authenticated users to manage news
*/

CREATE TABLE IF NOT EXISTS news_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content text,
  source text,
  author text,
  category text,
  status text DEFAULT 'active',
  publish_date date DEFAULT CURRENT_DATE,
  external_link text,
  views integer DEFAULT 0,
  tags jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active news
CREATE POLICY "Public can read active news"
  ON news_items
  FOR SELECT
  TO public
  USING (status = 'active' OR status = 'featured');

-- Allow authenticated users to manage all news
CREATE POLICY "Authenticated users can manage news"
  ON news_items
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_news_source ON news_items(source);
CREATE INDEX IF NOT EXISTS idx_news_category ON news_items(category);
CREATE INDEX IF NOT EXISTS idx_news_status ON news_items(status);
CREATE INDEX IF NOT EXISTS idx_news_publish_date ON news_items(publish_date);

-- Insert sample news data
INSERT INTO news_items (title, description, content, source, author, category, status, publish_date, external_link, views, tags) VALUES
(
  'Sensex rises 200 points on strong FII inflows',
  'Indian equity markets opened higher today driven by positive global cues and strong foreign institutional investor inflows.',
  'The Indian stock market witnessed a strong rally today as the Sensex gained over 200 points...',
  'Economic Times',
  'Market Reporter',
  'Market News',
  'active',
  '2024-12-15',
  'https://economictimes.indiatimes.com/example',
  15600,
  '["sensex", "fii", "market"]'::jsonb
),
(
  'RBI maintains repo rate at 6.5% in latest policy review',
  'The Reserve Bank of India kept the benchmark repo rate unchanged at 6.5% citing inflation concerns and global economic uncertainty.',
  'The Reserve Bank of India''s Monetary Policy Committee decided to maintain the repo rate...',
  'Business Standard',
  'Policy Desk',
  'Policy News',
  'featured',
  '2024-12-14',
  'https://business-standard.com/example',
  22300,
  '["rbi", "repo rate", "policy"]'::jsonb
),
(
  'IT stocks rally on strong Q3 earnings outlook',
  'Information technology stocks surged in early trade as investors bet on strong third-quarter earnings from major IT companies.',
  'The IT sector witnessed significant buying interest today...',
  'Moneycontrol',
  'Tech Reporter',
  'Sector News',
  'active',
  '2024-12-13',
  'https://moneycontrol.com/example',
  8900,
  '["it stocks", "earnings", "q3"]'::jsonb
),
(
  'Banking sector shows resilience amid global headwinds',
  'Indian banking stocks outperformed broader markets as investors showed confidence in the sector''s asset quality improvements.',
  'Banking stocks continued their upward trajectory...',
  'LiveMint',
  'Banking Correspondent',
  'Sector News',
  'active',
  '2024-12-12',
  'https://livemint.com/example',
  7200,
  '["banking", "stocks", "resilience"]'::jsonb
),
(
  'Gold prices surge on safe-haven demand',
  'Gold prices in India touched new highs as investors sought safe-haven assets amid global economic uncertainties.',
  'Gold prices continued their upward momentum...',
  'Financial Express',
  'Commodity Desk',
  'Commodities',
  'active',
  '2024-12-11',
  'https://financialexpress.com/example',
  5400,
  '["gold", "prices", "safe-haven"]'::jsonb
);