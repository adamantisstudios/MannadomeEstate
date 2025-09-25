-- Real Estate Database Setup Script
-- Run this script in your Supabase SQL Editor to set up the complete database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE property_status AS ENUM ('available', 'sold', 'rented', 'pending');
CREATE TYPE property_type AS ENUM ('house', 'apartment', 'villa', 'land', 'commercial');
CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'closed');

-- Drop existing tables if they exist (to ensure clean setup)
DROP TABLE IF EXISTS public.admin_users CASCADE;
DROP TABLE IF EXISTS public.inquiries CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.properties CASCADE;

-- Create properties table
CREATE TABLE public.properties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(15,2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    property_type property_type NOT NULL,
    status property_status DEFAULT 'available',
    bedrooms INTEGER,
    bathrooms INTEGER,
    area_sqft INTEGER, -- Ensuring this column exists
    features TEXT[], -- Array of features
    images TEXT[], -- Array of image URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inquiries table
CREATE TABLE public.inquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    property_id UUID REFERENCES public.properties(id),
    message TEXT NOT NULL,
    status inquiry_status DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table (for additional admin management)
CREATE TABLE public.admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON public.admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fixed INSERT statements to match exact column names
-- Insert sample properties
INSERT INTO public.properties (title, description, price, location, property_type, bedrooms, bathrooms, area_sqft, features, images) VALUES
('Luxury Lakeside Villa', 'Stunning 4-bedroom villa with panoramic lake views, modern amenities, and private dock. Perfect for luxury living in Ghana.', 850000.00, 'Lake Volta, Eastern Region', 'villa', 4, 3, 3500, ARRAY['Lake View', 'Private Dock', 'Swimming Pool', 'Garden', 'Garage', 'Security System'], ARRAY['/luxury-villa-with-lake-view-ghana.png', '/luxury-villa-interior-1.png', '/luxury-villa-interior-2.png']),

('Modern Family House', 'Beautiful 3-bedroom family home in a quiet neighborhood with modern finishes and spacious living areas.', 320000.00, 'East Legon, Accra', 'house', 3, 2, 2200, ARRAY['Modern Kitchen', 'Spacious Living Room', 'Master Suite', 'Parking', 'Security'], ARRAY['/modern-family-house-ghana.png', '/luxury-modern-house-with-lake-view-in-ghana.png']),

('Executive Apartment', 'Luxury 2-bedroom apartment in prime location with city views and premium amenities.', 180000.00, 'Airport Residential, Accra', 'apartment', 2, 2, 1400, ARRAY['City View', 'Gym Access', 'Swimming Pool', 'Parking', '24/7 Security'], ARRAY['/luxury-modern-house-with-lake-view-in-ghana.png']),

('Commercial Land', 'Prime commercial land in developing area, perfect for business development or investment.', 450000.00, 'Tema, Greater Accra', 'land', NULL, NULL, 8000, ARRAY['Commercial Zoning', 'Road Access', 'Utilities Available'], ARRAY['/luxury-villa-exterior.png']),

('Beachfront Villa', 'Exclusive beachfront property with private beach access and luxury amenities.', 1200000.00, 'Cape Coast, Central Region', 'villa', 5, 4, 4200, ARRAY['Beach Access', 'Ocean View', 'Swimming Pool', 'Tennis Court', 'Staff Quarters'], ARRAY['/luxury-villa-with-lake-view-ghana.png', '/luxury-villa-interior-1.png']),

('Investment Apartment', 'Well-located 1-bedroom apartment perfect for rental investment with good returns.', 95000.00, 'Dansoman, Accra', 'apartment', 1, 1, 800, ARRAY['Furnished', 'Good Location', 'Rental Ready'], ARRAY['/modern-family-house-ghana.png']);

-- Insert sample testimonials
INSERT INTO public.testimonials (name, email, rating, message, image_url, is_featured) VALUES
('Alice Ayoka', 'alice.ayoka@email.com', 5, 'This real estate company helped me find my dream home! Their professionalism and attention to detail made the entire process smooth and stress-free.', '/client-alice-ayoka.png', true),

('Kwame & Sarah Osei', 'kwame.osei@email.com', 5, 'We couldn''t be happier with our new villa. The team went above and beyond to ensure we found the perfect property for our family.', '/client-kwame-sarah.png', true),

('Charles Ashong', 'charles.ashong@email.com', 5, 'Excellent service from start to finish. They understood exactly what I was looking for and delivered beyond my expectations.', '/client-charles-ashong.png', true),

('The Acquah Family', 'acquah.family@email.com', 5, 'Professional, reliable, and trustworthy. This company made our property purchase a wonderful experience.', '/client-acquah-family.png', true),

('Ama Mensah', 'ama.mensah@email.com', 5, 'Outstanding customer service and beautiful properties. I highly recommend this real estate company to anyone looking for quality properties in Ghana.', '/client-ama-mensah.png', true),

('Emmanuel Boateng', 'emmanuel.boateng@email.com', 5, 'The best real estate experience I''ve ever had. Their expertise and dedication to client satisfaction is unmatched.', '/client-emmanuel-boateng.png', true);

-- Set up Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to properties and testimonials
CREATE POLICY "Properties are viewable by everyone" ON public.properties
    FOR SELECT USING (true);

CREATE POLICY "Testimonials are viewable by everyone" ON public.testimonials
    FOR SELECT USING (true);

-- Create policies for admin access
CREATE POLICY "Admin full access to properties" ON public.properties
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = auth.uid() AND is_active = true
        )
    );

CREATE POLICY "Admin full access to inquiries" ON public.inquiries
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = auth.uid() AND is_active = true
        )
    );

CREATE POLICY "Admin full access to testimonials" ON public.testimonials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = auth.uid() AND is_active = true
        )
    );

-- Allow public to insert inquiries
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries
    FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_location ON public.properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_admin_users_auth_id ON public.admin_users(auth_user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.properties TO anon, authenticated;
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for property images
CREATE POLICY "Property images are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'property-images' AND 
        auth.role() = 'authenticated'
    );

CREATE POLICY "Authenticated users can update property images" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'property-images' AND 
        auth.role() = 'authenticated'
    );

CREATE POLICY "Authenticated users can delete property images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'property-images' AND 
        auth.role() = 'authenticated'
    );

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  -- Only create admin_users entry for the specific admin email
  IF NEW.email = 'info.mannadomeestate@gmail.com' THEN
    INSERT INTO public.admin_users (auth_user_id, email, full_name, role)
    VALUES (NEW.id, NEW.email, 'Real Estate Admin', 'super_admin');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create admin_users entry
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
