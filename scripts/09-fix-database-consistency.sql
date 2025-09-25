-- Fix database schema consistency issues
-- This script ensures all tables have consistent column names and structure

-- First, let's standardize the testimonials table to use 'content' column consistently
-- Drop and recreate testimonials table with consistent schema
DROP TABLE IF EXISTS testimonials CASCADE;

CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert updated testimonials with Ghanaian business people
INSERT INTO testimonials (name, content, rating, featured) VALUES
('Kwame Asante', 'Mannadome Estate helped me find the perfect commercial property for my business. Their professionalism and market knowledge are unmatched. As a business owner, I appreciate their attention to detail and transparency in every transaction.', 5, true),
('Akosua Mensah', 'As a first-time homebuyer, I was nervous about the process. The team at Mannadome Estate guided me every step of the way. Their expertise made what seemed overwhelming into a smooth and exciting journey to homeownership.', 5, true),
('Kofi Boateng', 'I have been investing in real estate for over 10 years, and Mannadome Estate consistently delivers quality properties with excellent returns. Their market analysis and investment advice have been invaluable to my portfolio growth.', 5, true),
('Ama Osei', 'The customer service is exceptional. They found me a beautiful family home in East Legon within my budget. The entire team was patient, professional, and truly cared about finding the right property for my family.', 5, true),
('Yaw Oppong', 'Professional, reliable, and trustworthy. Mannadome Estate sold my property quickly and at a great price. Their marketing strategy and negotiation skills are top-notch. I will definitely use their services again.', 5, true),
('Efua Adjei', 'Their market reports and property valuations are always accurate. As a business owner, I appreciate their attention to detail and transparency. Mannadome Estate has become my trusted partner for all real estate needs.', 5, false)
ON CONFLICT DO NOTHING;

-- Fix inquiries table to match API expectations
DROP TABLE IF EXISTS inquiries CASCADE;

CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'general',
  property_id UUID,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);

-- Update RLS policies to match the corrected schema
DROP POLICY IF EXISTS "testimonials_select_policy" ON testimonials;
DROP POLICY IF EXISTS "testimonials_insert_policy" ON testimonials;
DROP POLICY IF EXISTS "testimonials_update_policy" ON testimonials;
DROP POLICY IF EXISTS "testimonials_delete_policy" ON testimonials;

DROP POLICY IF EXISTS "inquiries_select_policy" ON inquiries;
DROP POLICY IF EXISTS "inquiries_insert_policy" ON inquiries;
DROP POLICY IF EXISTS "inquiries_update_policy" ON inquiries;
DROP POLICY IF EXISTS "inquiries_delete_policy" ON inquiries;

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonials
CREATE POLICY "testimonials_select_policy" ON testimonials
    FOR SELECT
    USING (true);

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

-- Create policies for inquiries
CREATE POLICY "inquiries_select_policy" ON inquiries
    FOR SELECT
    USING (true);

CREATE POLICY "inquiries_insert_policy" ON inquiries
    FOR INSERT
    WITH CHECK (true);

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

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON testimonials TO anon;
GRANT INSERT ON inquiries TO anon;
