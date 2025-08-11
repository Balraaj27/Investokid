/*
  # Create Articles Table

  1. New Tables
    - `articles`
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
      - `tags` (jsonb)
      - `content_blocks` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `articles` table
    - Add policy for public read access to published articles
    - Add policy for authenticated users to manage articles
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  content text,
  author text,
  category text,
  status text DEFAULT 'draft',
  publish_date date DEFAULT CURRENT_DATE,
  read_time text DEFAULT '5 min read',
  views integer DEFAULT 0,
  tags jsonb DEFAULT '[]'::jsonb,
  content_blocks jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published articles
CREATE POLICY "Public can read published articles"
  ON articles
  FOR SELECT
  TO public
  USING (status = 'published');

-- Allow authenticated users to manage all articles
CREATE POLICY "Authenticated users can manage articles"
  ON articles
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_publish_date ON articles(publish_date);
CREATE INDEX IF NOT EXISTS idx_articles_views ON articles(views);

-- Insert sample data
INSERT INTO articles (title, excerpt, content, author, category, status, publish_date, read_time, views, tags, content_blocks) VALUES
(
  'What is Investing? A Beginner''s Complete Guide',
  'Learn the fundamental concepts of investing, why it''s important, and how to get started with your first investment.',
  'Investing is the act of allocating money or capital to an endeavor with the expectation of obtaining additional income or profit...',
  'Sarah Johnson',
  'Investment Basics',
  'published',
  '2024-12-15',
  '8 min read',
  12500,
  '["investing", "beginner", "finance"]'::jsonb,
  '[
    {
      "id": "1",
      "type": "heading",
      "content": "What is Investing?",
      "metadata": {"level": 2}
    },
    {
      "id": "2", 
      "type": "paragraph",
      "content": "Investing is the act of allocating money or capital to an endeavor with the expectation of obtaining additional income or profit..."
    }
  ]'::jsonb
),
(
  'Understanding Risk vs Return in Investments',
  'Discover the relationship between investment risk and potential returns, and how to balance them in your portfolio.',
  'The risk-return tradeoff is a fundamental principle in investing that states potential return rises with an increase in risk...',
  'Michael Chen',
  'Investment Basics',
  'published',
  '2024-12-12',
  '6 min read',
  8900,
  '["risk", "return", "portfolio"]'::jsonb,
  '[]'::jsonb
),
(
  'Introduction to Technical Analysis',
  'Learn the fundamentals of technical analysis and how to read price charts effectively.',
  'Technical analysis is the study of past market data, primarily price and volume...',
  'Alex Thompson',
  'Technical Analysis',
  'published',
  '2024-12-10',
  '10 min read',
  15600,
  '["technical", "charts", "analysis"]'::jsonb,
  '[]'::jsonb
),
(
  'Creating Your First Budget',
  'Learn how to create a realistic budget that works for your lifestyle and financial goals.',
  'Budgeting is the foundation of financial planning and wealth building...',
  'Jennifer Martinez',
  'Financial Planning',
  'published',
  '2024-12-08',
  '9 min read',
  11200,
  '["budgeting", "planning", "finance"]'::jsonb,
  '[]'::jsonb
),
(
  'What is Bitcoin? A Beginner''s Guide',
  'Learn the fundamentals of Bitcoin, how it works, and why it''s considered digital gold.',
  'Bitcoin is a decentralized digital currency that operates without a central authority...',
  'Alex Chen',
  'Cryptocurrency',
  'published',
  '2024-12-05',
  '10 min read',
  9800,
  '["bitcoin", "crypto", "blockchain"]'::jsonb,
  '[]'::jsonb
);