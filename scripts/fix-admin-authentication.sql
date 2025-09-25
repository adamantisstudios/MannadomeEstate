-- Fix admin authentication by updating RLS policies and creating admin user

-- First, temporarily disable RLS to create the admin user
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Delete any existing admin user for this email to avoid conflicts
DELETE FROM admin_users WHERE email = 'info.mannadomeestate@gmail.com';

-- Create the admin user record manually
INSERT INTO admin_users (
  auth_user_id,
  email,
  full_name,
  role,
  is_active,
  created_at,
  updated_at
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'info.mannadomeestate@gmail.com' LIMIT 1),
  'info.mannadomeestate@gmail.com',
  'John Ambrose',
  'super_admin',
  true,
  NOW(),
  NOW()
);

-- Re-enable RLS with proper policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin users can manage all admin records" ON admin_users;
DROP POLICY IF EXISTS "Allow admin user creation" ON admin_users;
DROP POLICY IF EXISTS "Allow admin user read" ON admin_users;

-- Create comprehensive RLS policies for admin_users
CREATE POLICY "Allow admin user creation" ON admin_users
  FOR INSERT 
  WITH CHECK (true); -- Allow any authenticated user to create admin records

CREATE POLICY "Allow admin user read" ON admin_users
  FOR SELECT 
  USING (true); -- Allow reading admin user records

CREATE POLICY "Allow admin user updates" ON admin_users
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

-- Verify the admin user was created
SELECT 
  id,
  email,
  full_name,
  role,
  is_active,
  created_at
FROM admin_users 
WHERE email = 'info.mannadomeestate@gmail.com';
