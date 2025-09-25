-- Create admin user directly in Supabase Auth
-- This bypasses the need for email confirmation
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'info.mannadomeestate@gmail.com',
  crypt('mannadomeEstate_ltd@2025', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Create corresponding admin_users record
INSERT INTO public.admin_users (
  auth_user_id,
  email,
  full_name,
  role,
  is_active,
  created_at,
  updated_at
) SELECT 
  (SELECT id FROM auth.users WHERE email = 'info.mannadomeestate@gmail.com'),
  'info.mannadomeestate@gmail.com',
  'Real Estate Admin',
  'super_admin',
  true,
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM public.admin_users WHERE email = 'info.mannadomeestate@gmail.com'
);
