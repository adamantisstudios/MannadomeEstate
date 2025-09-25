-- Direct admin user creation bypassing RLS policies
-- This will create the admin user record that the authentication system needs

-- Temporarily disable RLS to insert the admin user
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Delete any existing admin user with this email to avoid conflicts
DELETE FROM admin_users WHERE email = 'info.mannadomeestate@gmail.com';

-- Create the admin user record directly
INSERT INTO admin_users (
    id,
    email,
    name,
    role,
    created_at,
    updated_at
) VALUES (
    gen_random_uuid(),
    'info.mannadomeestate@gmail.com',
    'John Ambrose',
    'admin',
    NOW(),
    NOW()
);

-- Re-enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create a permissive policy that allows admin operations
DROP POLICY IF EXISTS "Allow admin operations" ON admin_users;
CREATE POLICY "Allow admin operations" ON admin_users
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Verify the admin user was created
SELECT * FROM admin_users WHERE email = 'info.mannadomeestate@gmail.com';
