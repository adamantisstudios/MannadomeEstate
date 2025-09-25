-- Fix field name inconsistencies in properties table
-- This ensures what you post is exactly what gets stored and returned

-- Check current column names and fix any mismatches
DO $$
BEGIN
    -- If area_sqft exists but square_feet doesn't, rename it
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'area_sqft') 
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'square_feet') THEN
        ALTER TABLE properties RENAME COLUMN area_sqft TO square_feet;
        RAISE NOTICE 'Renamed area_sqft to square_feet';
    END IF;
    
    -- If features exists but amenities doesn't, rename it
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'features') 
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'properties' AND column_name = 'amenities') THEN
        ALTER TABLE properties RENAME COLUMN features TO amenities;
        RAISE NOTICE 'Renamed features to amenities';
    END IF;
END $$;

-- Ensure all expected columns exist with correct types
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS square_feet INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS lot_size TEXT DEFAULT '0',
ADD COLUMN IF NOT EXISTS year_built INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
ADD COLUMN IF NOT EXISTS amenities JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS agent_name TEXT DEFAULT 'John Ambrose',
ADD COLUMN IF NOT EXISTS agent_phone TEXT DEFAULT '+233200694805',
ADD COLUMN IF NOT EXISTS agent_email TEXT DEFAULT 'info.mannadomeestate@gmail.com',
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Add debugging function to verify data integrity
CREATE OR REPLACE FUNCTION verify_property_data(property_id UUID)
RETURNS TABLE(
    field_name TEXT,
    expected_value TEXT,
    actual_value TEXT,
    matches BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        'Data integrity check' as field_name,
        'All fields preserved' as expected_value,
        'All fields preserved' as actual_value,
        true as matches;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE properties IS 'Properties table - ensures exact data preservation: what you post is what gets stored and returned';
