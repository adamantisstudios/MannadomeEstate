-- Fix RLS policies to allow admin user lookup and authentication
-- This allows the auth system to find existing admin users

-- First, check if admin user exists
SELECT 'Checking existing admin users:' as status;
SELECT id, email, role, is_active, created_at 
FROM admin_users 
WHERE email = 'info.mannadomeestate@gmail.com';

-- Drop existing restrictive RLS policies
DROP POLICY IF EXISTS "admin_users_policy" ON admin_users;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON admin_users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON admin_users;

-- Create permissive RLS policies that allow authentication flow
CREATE POLICY "Allow admin user authentication" ON admin_users
    FOR ALL 
    USING (true)
    WITH CHECK (true);

-- Ensure RLS is enabled but with permissive policy
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

SELECT 'RLS policies updated successfully' as status;

-- Verify the admin user can now be found
SELECT 'Verifying admin user lookup:' as status;
SELECT id, email, role, is_active 
FROM admin_users 
WHERE email = 'info.mannadomeestate@gmail.com';
