-- Comprehensive script to add ALL missing columns to properties table
-- Based on your Property interface requirements

-- Add missing columns one by one with proper data types
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS agent_name TEXT DEFAULT 'John Ambrose',
ADD COLUMN IF NOT EXISTS agent_phone TEXT DEFAULT '+233200694805',
ADD COLUMN IF NOT EXISTS agent_email TEXT DEFAULT 'info.mannadomeestate@gmail.com',
ADD COLUMN IF NOT EXISTS amenities JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS lot_size TEXT DEFAULT 'N/A',
ADD COLUMN IF NOT EXISTS year_built INTEGER DEFAULT 2020,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Update existing properties with reasonable default amenities based on property type
UPDATE properties 
SET amenities = CASE 
  WHEN property_type = 'house' THEN '["Parking", "Garden", "Security"]'::jsonb
  WHEN property_type = 'apartment' THEN '["Elevator", "Security", "Balcony"]'::jsonb
  WHEN property_type = 'condo' THEN '["Pool", "Gym", "Security", "Parking"]'::jsonb
  WHEN property_type = 'townhouse' THEN '["Parking", "Garden", "Security"]'::jsonb
  ELSE '["Security"]'::jsonb
END
WHERE amenities = '[]'::jsonb OR amenities IS NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_agent_email ON properties(agent_email);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_amenities ON properties USING GIN(amenities);

-- Verify the changes
SELECT 'Schema update completed. Checking columns...' as status;
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'properties' 
ORDER BY column_name;
