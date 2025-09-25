-- Create properties table if it doesn't exist
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  location TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(10,2),
  property_type TEXT,
  status TEXT DEFAULT 'available',
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample properties
INSERT INTO properties (title, description, price, location, bedrooms, bathrooms, area, property_type, images) VALUES
('Luxury Villa in East Legon', 'Beautiful 4-bedroom villa with modern amenities', 850000.00, 'East Legon, Accra', 4, 3, 350.5, 'Villa', ARRAY['/placeholder.svg?height=300&width=400']),
('Modern Apartment in Airport Residential', 'Spacious 3-bedroom apartment with city views', 450000.00, 'Airport Residential, Accra', 3, 2, 180.0, 'Apartment', ARRAY['/placeholder.svg?height=300&width=400']),
('Executive Townhouse in Tema', 'Contemporary 5-bedroom townhouse with garden', 620000.00, 'Tema, Greater Accra', 5, 4, 280.0, 'Townhouse', ARRAY['/placeholder.svg?height=300&width=400'])
ON CONFLICT DO NOTHING;
