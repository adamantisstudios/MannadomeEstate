-- Add the missing 'featured' column to the properties table
ALTER TABLE properties 
ADD COLUMN featured BOOLEAN DEFAULT false;

-- Fixed SQL syntax - using a proper subquery instead of LIMIT in UPDATE
UPDATE properties 
SET featured = true 
WHERE id IN (
    SELECT id 
    FROM properties 
    WHERE status = 'available' 
    AND price > (SELECT AVG(price) FROM properties WHERE status = 'available')
    ORDER BY price DESC
    LIMIT 3
);

-- Create an index for better performance when filtering by featured
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'properties' AND column_name = 'featured';
