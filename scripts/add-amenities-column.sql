-- Add amenities column to properties table
-- This column will store property amenities as a JSON array

ALTER TABLE properties 
ADD COLUMN amenities JSONB DEFAULT '[]'::jsonb;

-- Add a comment to document the column
COMMENT ON COLUMN properties.amenities IS 'Property amenities stored as JSON array of strings';

-- Update existing properties with some default amenities based on property type
UPDATE properties 
SET amenities = CASE 
  WHEN property_type = 'house' THEN '["Parking", "Garden"]'::jsonb
  WHEN property_type = 'apartment' THEN '["Elevator", "Security"]'::jsonb
  WHEN property_type = 'condo' THEN '["Pool", "Gym"]'::jsonb
  ELSE '["Basic Utilities"]'::jsonb
END
WHERE amenities = '[]'::jsonb;

-- Create an index on amenities for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_amenities ON properties USING GIN (amenities);
