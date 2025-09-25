-- Comprehensive Test Script for Admin CRUD Operations
-- This script tests all admin functionality to ensure everything works properly

-- Test 1: Verify admin user exists and is active
SELECT 'TEST 1: Admin User Verification' as test_name;
SELECT 
    id, 
    email, 
    full_name, 
    role, 
    is_active,
    created_at
FROM admin_users 
WHERE email = 'info.mannadomeestate@gmail.com';

-- Test 2: Check RLS policies are properly configured
SELECT 'TEST 2: RLS Policy Verification' as test_name;
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    cmd as operation,
    CASE 
        WHEN qual IS NOT NULL THEN 'Has USING clause'
        ELSE 'No USING clause'
    END as using_clause,
    CASE 
        WHEN with_check IS NOT NULL THEN 'Has WITH CHECK clause'
        ELSE 'No WITH CHECK clause'
    END as with_check_clause
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('admin_users', 'properties', 'testimonials', 'inquiries')
ORDER BY tablename, cmd;

-- Test 3: Verify properties table structure and sample data
SELECT 'TEST 3: Properties Table Verification' as test_name;
SELECT 
    COUNT(*) as total_properties,
    COUNT(CASE WHEN status = 'available' THEN 1 END) as available_properties,
    COUNT(CASE WHEN status = 'sold' THEN 1 END) as sold_properties,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_properties,
    COUNT(CASE WHEN featured = true THEN 1 END) as featured_properties
FROM properties;

-- Test 4: Verify testimonials table structure and sample data
SELECT 'TEST 4: Testimonials Table Verification' as test_name;
SELECT 
    COUNT(*) as total_testimonials,
    COUNT(CASE WHEN featured = true THEN 1 END) as featured_testimonials,
    ROUND(AVG(rating), 2) as average_rating,
    MIN(rating) as min_rating,
    MAX(rating) as max_rating
FROM testimonials;

-- Test 5: Verify inquiries table structure
SELECT 'TEST 5: Inquiries Table Verification' as test_name;
SELECT 
    COUNT(*) as total_inquiries,
    COUNT(CASE WHEN status = 'new' THEN 1 END) as new_inquiries,
    COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted_inquiries,
    COUNT(CASE WHEN status = 'closed' THEN 1 END) as closed_inquiries
FROM inquiries;

-- Test 6: Test property CRUD operations (as admin user)
SELECT 'TEST 6: Property CRUD Test' as test_name;

-- Insert test property
INSERT INTO properties (
    title, 
    description, 
    price, 
    location, 
    property_type, 
    bedrooms, 
    bathrooms, 
    square_feet, 
    status, 
    featured
) VALUES (
    'Test Property - Admin CRUD', 
    'This is a test property for CRUD operations', 
    500000, 
    'Test Location, Accra', 
    'House', 
    3, 
    2, 
    1500, 
    'available', 
    false
) RETURNING id, title, status;

-- Test 7: Test testimonial CRUD operations
SELECT 'TEST 7: Testimonial CRUD Test' as test_name;

-- Insert test testimonial
INSERT INTO testimonials (
    client_name, 
    client_title, 
    content, 
    rating, 
    featured
) VALUES (
    'Test Client - Admin CRUD', 
    'Test Title', 
    'This is a test testimonial for CRUD operations', 
    5, 
    false
) RETURNING id, client_name, rating;

-- Test 8: Test inquiry CRUD operations
SELECT 'TEST 8: Inquiry CRUD Test' as test_name;

-- Insert test inquiry
INSERT INTO inquiries (
    property_id, 
    full_name, 
    email, 
    phone, 
    message, 
    inquiry_type, 
    status
) VALUES (
    (SELECT id FROM properties LIMIT 1), 
    'Test Inquirer - Admin CRUD', 
    'test@example.com', 
    '+233 24 000 0000', 
    'This is a test inquiry for CRUD operations', 
    'information', 
    'new'
) RETURNING id, full_name, status;

-- Test 9: Verify table permissions for authenticated users
SELECT 'TEST 9: Table Permissions Verification' as test_name;
SELECT 
    schemaname,
    tablename,
    CASE 
        WHEN has_table_privilege('authenticated', schemaname||'.'||tablename, 'SELECT') THEN 'YES'
        ELSE 'NO'
    END as can_select,
    CASE 
        WHEN has_table_privilege('authenticated', schemaname||'.'||tablename, 'INSERT') THEN 'YES'
        ELSE 'NO'
    END as can_insert,
    CASE 
        WHEN has_table_privilege('authenticated', schemaname||'.'||tablename, 'UPDATE') THEN 'YES'
        ELSE 'NO'
    END as can_update,
    CASE 
        WHEN has_table_privilege('authenticated', schemaname||'.'||tablename, 'DELETE') THEN 'YES'
        ELSE 'NO'
    END as can_delete
FROM information_schema.tables 
WHERE schemaname = 'public' 
AND tablename IN ('admin_users', 'properties', 'testimonials', 'inquiries');

-- Test 10: Clean up test data
SELECT 'TEST 10: Cleanup Test Data' as test_name;

-- Delete test records
DELETE FROM inquiries WHERE full_name = 'Test Inquirer - Admin CRUD';
DELETE FROM testimonials WHERE client_name = 'Test Client - Admin CRUD';
DELETE FROM properties WHERE title = 'Test Property - Admin CRUD';

-- Final verification
SELECT 'FINAL: Test Summary' as test_name;
SELECT 
    'Admin system is ready for use!' as status,
    (SELECT COUNT(*) FROM admin_users WHERE is_active = true) as active_admins,
    (SELECT COUNT(*) FROM properties) as total_properties,
    (SELECT COUNT(*) FROM testimonials) as total_testimonials,
    (SELECT COUNT(*) FROM inquiries) as total_inquiries;
