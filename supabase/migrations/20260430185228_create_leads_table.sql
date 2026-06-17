/*
  # Create leads table for quote form submissions

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `service` (text) - selected service type
      - `name` (text) - contact name
      - `phone` (text) - phone number
      - `email` (text) - email address
      - `description` (text) - project description
      - `created_at` (timestamptz) - submission timestamp

  2. Security
    - Enable RLS on `leads` table
    - Add policy for anonymous inserts (public form submissions)
    - No select policy for public (admin only via service role)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL DEFAULT '',
  name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous lead submissions"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
