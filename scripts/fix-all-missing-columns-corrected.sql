-- Add all missing columns to properties table
-- First, let's add the columns without enum-dependent defaults

-- Add agent columns
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS agent_name VARCHAR(255) DEFAULT 'John Ambrose',
ADD COLUMN IF NOT EXISTS agent_phone VARCHAR(20) DEFAULT '+233200694805',
ADD COLUMN IF NOT EXISTS agent_email VARCHAR(255) DEFAULT 'info.mannadomeestate@gmail.com';

-- Add amenities column as JSONB array
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS amenities JSONB DEFAULT '[]'::jsonb;

-- Add other missing columns
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS virtual_tour_url TEXT,
ADD COLUMN IF NOT EXISTS year_built INTEGER,
ADD COLUMN IF NOT EXISTS lot_size DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS parking_spaces INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS furnished BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS pet_friendly BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS utilities_included TEXT[],
ADD COLUMN IF NOT EXISTS neighborhood_info TEXT,
ADD COLUMN IF NOT EXISTS nearby_schools TEXT[],
ADD COLUMN IF NOT EXISTS transportation_access TEXT,
ADD COLUMN IF NOT EXISTS hoa_fees DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS property_taxes DECIMAL(10,2);

-- Update existing properties with basic amenities (using safe defaults)
UPDATE properties 
SET amenities = '["Parking", "Security"]'::jsonb 
WHERE amenities = '[]'::jsonb OR amenities IS NULL;

-- Create index for better performance on amenities searches
CREATE INDEX IF NOT EXISTS idx_properties_amenities ON properties USING GIN (amenities);

-- Show final schema
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'properties' AND table_schema = 'public'
ORDER BY ordinal_position;
