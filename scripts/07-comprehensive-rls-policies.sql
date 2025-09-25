-- Comprehensive RLS Policies for Admin System
-- This script ensures all admin operations work without RLS violations

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "admin_users_select_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_users_insert_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_users_update_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_users_delete_policy" ON admin_users;

DROP POLICY IF EXISTS "properties_select_policy" ON properties;
DROP POLICY IF EXISTS "properties_insert_policy" ON properties;
DROP POLICY IF EXISTS "properties_update_policy" ON properties;
DROP POLICY IF EXISTS "properties_delete_policy" ON properties;

DROP POLICY IF EXISTS "testimonials_select_policy" ON testimonials;
DROP POLICY IF EXISTS "testimonials_insert_policy" ON testimonials;
DROP POLICY IF EXISTS "testimonials_update_policy" ON testimonials;
DROP POLICY IF EXISTS "testimonials_delete_policy" ON testimonials;

DROP POLICY IF EXISTS "inquiries_select_policy" ON inquiries;
DROP POLICY IF EXISTS "inquiries_insert_policy" ON inquiries;
DROP POLICY IF EXISTS "inquiries_update_policy" ON inquiries;
DROP POLICY IF EXISTS "inquiries_delete_policy" ON inquiries;

-- ADMIN_USERS TABLE POLICIES
-- Allow authenticated users to select admin_users (for login verification)
CREATE POLICY "admin_users_select_policy" ON admin_users
    FOR SELECT
    USING (auth.uid() IS NOT NULL);

-- Allow authenticated users to insert admin_users (for auto-creation during login)
CREATE POLICY "admin_users_insert_policy" ON admin_users
    FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Allow admin users to update their own records
CREATE POLICY "admin_users_update_policy" ON admin_users
    FOR UPDATE
    USING (auth.uid() = auth_user_id)
    WITH CHECK (auth.uid() = auth_user_id);

-- Allow admin users to delete their own records (optional)
CREATE POLICY "admin_users_delete_policy" ON admin_users
    FOR DELETE
    USING (auth.uid() = auth_user_id);

-- PROPERTIES TABLE POLICIES
-- Allow everyone to select properties (public viewing)
CREATE POLICY "properties_select_policy" ON properties
    FOR SELECT
    USING (true);

-- Allow authenticated admin users to insert properties
CREATE POLICY "properties_insert_policy" ON properties
    FOR INSERT
    WITH CHECK (
        auth.uid() IS NOT NULL 
        AND EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND is_active = true
        )
    );

-- Allow authenticated admin users to update properties
CREATE POLICY "properties_update_policy" ON properties
    FOR UPDATE
    USING (
        auth.uid() IS NOT NULL 
        AND EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND is_active = true
        )
    )
    WITH CHECK (
        auth.uid() IS NOT NULL 
        AND EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND is_active = true
        )
    );

-- Allow authenticated admin users to delete properties
CREATE POLICY "properties_delete_policy" ON properties
    FOR DELETE
    USING (
        auth.uid() IS NOT NULL 
        AND EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND is_active = true
        )
    );

-- TESTIMONIALS TABLE POLICIES
-- Allow everyone to select testimonials (public viewing)
CREATE POLICY "testimonials_select_policy" ON testimonials
    FOR SELECT
    USING (true);

-- Allow authenticated admin users to insert testimonials
CREATE POLICY "testimonials_insert_policy" ON testimonials
    FOR INSERT
    WITH CHECK (
        auth.uid() IS NOT NULL 
        AND EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND is_active = true
        )
    );

-- Allow authenticated admin users to update testimonials
CREATE POLICY "testimonials_update_policy" ON testimonials
    FOR UPDATE
    USING (
        auth.uid() IS NOT NULL 
        AND EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND is_active = true
        )
    )
    WITH CHECK (
        auth.uid() IS NOT NULL 
        AND EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND is_active = true
        )
    );

-- Allow authenticated admin users to delete testimonials
CREATE POLICY "testimonials_delete_policy" ON testimonials
    FOR DELETE
    USING (
        auth.uid() IS NOT NULL 
        AND EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND is_active = true
        )
    );

-- INQUIRIES TABLE POLICIES
-- Allow everyone to select inquiries (for public inquiry viewing if needed)
CREATE POLICY "inquiries_select_policy" ON inquiries
    FOR SELECT
    USING (true);

-- Allow anyone to insert inquiries (public can submit inquiries)
CREATE POLICY "inquiries_insert_policy" ON inquiries
    FOR INSERT
    WITH CHECK (true);

-- Allow authenticated admin users to update inquiries
CREATE POLICY "inquiries_update_policy" ON inquiries
    FOR UPDATE
    USING (
        auth.uid() IS NOT NULL 
        AND EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND is_active = true
        )
    )
    WITH CHECK (
        auth.uid() IS NOT NULL 
        AND EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND is_active = true
        )
    );

-- Allow authenticated admin users to delete inquiries
CREATE POLICY "inquiries_delete_policy" ON inquiries
    FOR DELETE
    USING (
        auth.uid() IS NOT NULL 
        AND EXISTS (
            SELECT 1 FROM admin_users 
            WHERE auth_user_id = auth.uid() 
            AND is_active = true
        )
    );

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant permissions to anonymous users for public operations
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON properties TO anon;
GRANT SELECT ON testimonials TO anon;
GRANT INSERT ON inquiries TO anon;

-- Create indexes for better performance on RLS policy checks
CREATE INDEX IF NOT EXISTS idx_admin_users_auth_user_id ON admin_users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);

-- Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('admin_users', 'properties', 'testimonials', 'inquiries');

-- Show all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('admin_users', 'properties', 'testimonials', 'inquiries')
ORDER BY tablename, policyname;
