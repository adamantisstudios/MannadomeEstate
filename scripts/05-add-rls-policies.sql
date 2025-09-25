-- Add Row Level Security policies for admin_users table

-- Enable RLS on admin_users table (if not already enabled)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to select their own admin record
CREATE POLICY "Users can view their own admin record" ON public.admin_users
    FOR SELECT USING (auth.uid() = auth_user_id);

-- Policy to allow authenticated users to insert their own admin record
CREATE POLICY "Users can create their own admin record" ON public.admin_users
    FOR INSERT WITH CHECK (auth.uid() = auth_user_id);

-- Policy to allow authenticated users to update their own admin record
CREATE POLICY "Users can update their own admin record" ON public.admin_users
    FOR UPDATE USING (auth.uid() = auth_user_id);

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.admin_users TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
