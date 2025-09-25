-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert admin user
INSERT INTO admin_users (email, is_active) 
VALUES ('info.mannadomeestate@gmail.com', true)
ON CONFLICT (email) DO UPDATE SET is_active = true;
