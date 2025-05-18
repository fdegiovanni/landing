-- This is the SQL schema for the Supabase database
-- You can run this in the Supabase SQL editor

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE,
  response TEXT
);

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- Create RLS policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Only authenticated users with admin role can see all messages
CREATE POLICY "Admins can see all contact messages"
  ON contact_messages
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- Only authenticated users with admin role can insert/update/delete
CREATE POLICY "Admins can manage contact messages"
  ON contact_messages
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on update
CREATE TRIGGER update_contact_messages_updated_at
BEFORE UPDATE ON contact_messages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
