-- Create the admin user in Supabase Auth
-- This script creates the actual authentication user that can log in

-- First, let's check if the user already exists
DO $$
DECLARE
    user_exists boolean;
BEGIN
    -- Check if user exists in auth.users
    SELECT EXISTS(
        SELECT 1 FROM auth.users 
        WHERE email = 'info.mannadomeestate@gmail.com'
    ) INTO user_exists;
    
    IF user_exists THEN
        RAISE NOTICE 'User already exists in auth.users';
    ELSE
        RAISE NOTICE 'User does not exist in auth.users - you need to create it';
    END IF;
END $$;

-- Since we can't directly insert into auth.users from SQL (it's managed by Supabase Auth),
-- you need to either:
-- 1. Use the Supabase Dashboard to create the user
-- 2. Use the Supabase CLI
-- 3. Use the signup endpoint

-- For now, let's ensure the admin_users table has the correct structure and data
INSERT INTO public.admin_users (auth_user_id, email, full_name, role, is_active, created_at, updated_at)
SELECT 
    (SELECT id FROM auth.users WHERE email = 'info.mannadomeestate@gmail.com'),
    'info.mannadomeestate@gmail.com',
    'Real Estate Admin',
    'super_admin',
    true,
    now(),
    now()
WHERE NOT EXISTS (
    SELECT 1 FROM public.admin_users WHERE email = 'info.mannadomeestate@gmail.com'
);

-- If the above INSERT doesn't work because the auth user doesn't exist,
-- you'll need to create the auth user first using one of these methods:

-- METHOD 1: Using Supabase Dashboard
-- 1. Go to your Supabase project dashboard
-- 2. Navigate to Authentication > Users
-- 3. Click "Add user"
-- 4. Enter email: info.mannadomeestate@gmail.com
-- 5. Enter password: mannadomeEstate_ltd@2025
-- 6. Make sure "Auto Confirm User" is checked

-- METHOD 2: Using curl (run this in your terminal)
-- curl -X POST 'https://your-project-ref.supabase.co/auth/v1/admin/users' \
-- -H "apikey: YOUR_SERVICE_ROLE_KEY" \
-- -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
-- -H "Content-Type: application/json" \
-- -d '{
--   "email": "info.mannadomeestate@gmail.com",
--   "password": "mannadomeEstate_ltd@2025",
--   "email_confirm": true
-- }'

-- After creating the auth user, run this script again to link it to admin_users table
