-- Add the missing square_feet column to properties table
ALTER TABLE properties 
ADD COLUMN square_feet INTEGER;

-- Set reasonable default values based on property type
UPDATE properties 
SET square_feet = CASE 
    WHEN property_type = 'house' THEN 1500
    WHEN property_type = 'villa' THEN 2500
    WHEN property_type = 'apartment' THEN 800
    WHEN property_type = 'land' THEN NULL -- Land doesn't have square footage for buildings
    ELSE 1200
END
WHERE square_feet IS NULL;

-- Create index for better performance on square_feet queries
CREATE INDEX IF NOT EXISTS idx_properties_square_feet ON properties(square_feet);
