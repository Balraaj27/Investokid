/*
  # Create Users Table

  1. New Tables
    - `platform_users`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, unique, required)
      - `role` (text, default 'user')
      - `status` (text, default 'active')
      - `join_date` (date)
      - `last_login` (timestamp)
      - `articles_read` (integer, default 0)
      - `subscription_type` (text, default 'free')
      - `avatar` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `platform_users` table
    - Add policy for authenticated users to read user data
    - Add policy for admins to manage all users
*/

CREATE TABLE IF NOT EXISTS platform_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text DEFAULT 'user',
  status text DEFAULT 'active',
  join_date date DEFAULT CURRENT_DATE,
  last_login timestamptz,
  articles_read integer DEFAULT 0,
  subscription_type text DEFAULT 'free',
  avatar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE platform_users ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read user data
CREATE POLICY "Authenticated users can read users"
  ON platform_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to update their own data
CREATE POLICY "Users can update own data"
  ON platform_users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Allow admins to manage all users
CREATE POLICY "Admins can manage all users"
  ON platform_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM platform_users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON platform_users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON platform_users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON platform_users(status);
CREATE INDEX IF NOT EXISTS idx_users_subscription ON platform_users(subscription_type);

-- Insert sample users
INSERT INTO platform_users (name, email, role, status, join_date, last_login, articles_read, subscription_type) VALUES
(
  'John Doe',
  'john.doe@email.com',
  'user',
  'active',
  '2024-01-15',
  '2024-12-15 10:30:00',
  45,
  'premium'
),
(
  'Sarah Johnson',
  'sarah.johnson@email.com',
  'editor',
  'active',
  '2023-11-20',
  '2024-12-14 15:45:00',
  120,
  'pro'
),
(
  'Mike Wilson',
  'mike.wilson@email.com',
  'user',
  'inactive',
  '2024-03-10',
  '2024-11-28 09:15:00',
  23,
  'free'
),
(
  'Emily Davis',
  'emily.davis@email.com',
  'admin',
  'active',
  '2023-08-05',
  '2024-12-15 11:20:00',
  200,
  'pro'
),
(
  'Alex Thompson',
  'alex.thompson@email.com',
  'subscriber',
  'banned',
  '2024-06-12',
  '2024-10-15 14:30:00',
  8,
  'free'
);