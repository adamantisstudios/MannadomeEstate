# Admin Setup Guide

## How to Sign Up as Admin and Access Dashboard

### Step 1: Create Admin User in Supabase
1. Go to your Supabase dashboard: https://hqsfouxmubvsoehopdxa.supabase.co
2. Navigate to **Authentication** > **Users**
3. Click **Add User** and create a new user with:
   - **Email**: `info.mannadomeestate@gmail.com`
   - **Password**: Choose a secure password
   - **Email Confirm**: Set to `true` (confirmed)

### Step 2: Add Admin Role in Database
1. Go to **SQL Editor** in Supabase
2. Run this query to add the admin role:
\`\`\`sql
INSERT INTO public.admin_users (auth_user_id, email, full_name, role, is_active, created_at, updated_at)
SELECT
    (SELECT id FROM auth.users WHERE email = 'info.mannadomeestate@gmail.com'),
    'info.mannadomeestate@gmail.com',
    'Admin User',
    'super_admin',
    true,
    now(),
    now()
WHERE NOT EXISTS (
    SELECT 1 FROM public.admin_users WHERE email = 'info.mannadomeestate@gmail.com'
);

\`\`\`

### Step 3: Access Admin Dashboard
1. Visit your website at `/admin/login`
2. Sign in with the admin credentials:
   - **Email**: `info.mannadomeestate@gmail.com`
   - **Password**: The password you set in Step 1
3. You'll be redirected to the admin dashboard at `/admin/dashboard`

### Step 4: Start Managing Properties
From the admin dashboard, you can:
- **View Statistics**: See total properties, inquiries, and recent activity
- **Manage Properties**: Add, edit, or delete property listings
- **Handle Inquiries**: View and respond to customer inquiries
- **Upload Images**: Add property photos (automatically optimized for web)

### Navigation Links Status
✅ **Working Pages**:
- Buy Property → `/properties`
- Sell Property → `/sell`
- Property Management → `/management`
- Investment Advice → `/investment`
- Property Guides → `/guides`
- Market Reports → `/reports`
- FAQ → `/faq`
- Privacy Policy → `/privacy`

❌ **Still Need Creation**:
- Careers → `/careers`
- News & Updates → `/news`
- Financing Options → `/financing`
- Legal Services → `/legal`
- Support Center → `/support`

### Image Upload Optimization
The system automatically:
- Compresses images to 80% quality
- Resizes large images to max 1920px width
- Converts to WebP format for better performance
- Reduces file sizes by 60-80% on average

### Environment Variables Required
Make sure these are set in your Vercel deployment:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://hqsfouxmubvsoehopdxa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
