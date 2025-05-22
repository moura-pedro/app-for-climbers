/*
  # Content Management System Schema

  1. New Tables
    - `pages`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `meta_description` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `content_blocks`
      - `id` (uuid, primary key)
      - `page_id` (uuid, foreign key)
      - `identifier` (text)
      - `content_type` (text)
      - `content` (jsonb)
      - `order` (integer)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `media`
      - `id` (uuid, primary key)
      - `file_name` (text)
      - `file_path` (text)
      - `file_type` (text)
      - `alt_text` (text)
      - `created_at` (timestamp)
    
    - `navigation_menu`
      - `id` (uuid, primary key)
      - `name` (text)
      - `parent_id` (uuid, self-referential)
      - `url` (text)
      - `order` (integer)
      - `status` (text)
      - `created_at` (timestamp)
    
    - `settings`
      - `id` (uuid, primary key)
      - `setting_key` (text, unique)
      - `setting_value` (jsonb)
      - `group` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users with admin role
*/

-- Create enum types for status
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  meta_description text,
  status content_status DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create content_blocks table
CREATE TABLE IF NOT EXISTS content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES pages(id) ON DELETE CASCADE,
  identifier text NOT NULL,
  content_type text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  "order" integer NOT NULL DEFAULT 0,
  status content_status DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  alt_text text,
  created_at timestamptz DEFAULT now()
);

-- Create navigation_menu table
CREATE TABLE IF NOT EXISTS navigation_menu (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_id uuid REFERENCES navigation_menu(id) ON DELETE CASCADE,
  url text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  status content_status DEFAULT 'published',
  created_at timestamptz DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL DEFAULT '{}',
  "group" text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for pages
CREATE POLICY "Public users can read published pages"
  ON pages
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Admin users have full access to pages"
  ON pages
  TO authenticated
  USING (
    auth.jwt() ->> 'role' = 'admin'
  )
  WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Create policies for content_blocks
CREATE POLICY "Public users can read published content blocks"
  ON content_blocks
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Admin users have full access to content blocks"
  ON content_blocks
  TO authenticated
  USING (
    auth.jwt() ->> 'role' = 'admin'
  )
  WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Create policies for media
CREATE POLICY "Public users can read media"
  ON media
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin users have full access to media"
  ON media
  TO authenticated
  USING (
    auth.jwt() ->> 'role' = 'admin'
  )
  WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Create policies for navigation_menu
CREATE POLICY "Public users can read published navigation items"
  ON navigation_menu
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Admin users have full access to navigation"
  ON navigation_menu
  TO authenticated
  USING (
    auth.jwt() ->> 'role' = 'admin'
  )
  WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Create policies for settings
CREATE POLICY "Public users can read settings"
  ON settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin users have full access to settings"
  ON settings
  TO authenticated
  USING (
    auth.jwt() ->> 'role' = 'admin'
  )
  WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_pages_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_blocks_updated_at
    BEFORE UPDATE ON content_blocks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();