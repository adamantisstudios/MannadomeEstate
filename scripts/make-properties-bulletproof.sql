-- Make the properties table completely flexible and bulletproof
-- This script ensures ANY property data can be inserted without errors

-- First, make all columns nullable so nothing is required
ALTER TABLE properties 
ALTER COLUMN title DROP NOT NULL,
ALTER COLUMN description DROP NOT NULL,
ALTER COLUMN price DROP NOT NULL,
ALTER COLUMN location DROP NOT NULL,
ALTER COLUMN property_type DROP NOT NULL;

-- Add any potentially missing columns with safe defaults
DO $$ 
BEGIN
    -- Add columns that might be missing, ignore if they exist
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS square_feet INTEGER DEFAULT 0;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS agent_name VARCHAR(255) DEFAULT 'John Ambrose';
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS agent_email VARCHAR(255) DEFAULT 'info.mannadomeestate@gmail.com';
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS agent_phone VARCHAR(50) DEFAULT '+233200694805';
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS amenities JSONB DEFAULT '[]'::jsonb;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS virtual_tour_url TEXT;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS year_built INTEGER;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS lot_size DECIMAL(10,2);
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS parking_spaces INTEGER DEFAULT 0;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS furnished BOOLEAN DEFAULT false;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS pet_friendly BOOLEAN DEFAULT false;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS utilities_included BOOLEAN DEFAULT false;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS neighborhood_info TEXT;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS nearby_schools TEXT;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS transportation_access TEXT;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS hoa_fees DECIMAL(10,2);
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_taxes DECIMAL(10,2);
    EXCEPTION WHEN duplicate_column THEN NULL;
    END;
END $$;

-- Make sure we have all property types in the enum
DO $$ 
BEGIN
    -- Add missing enum values if they don't exist
    BEGIN
        ALTER TYPE property_type ADD VALUE IF NOT EXISTS 'house';
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    
    BEGIN
        ALTER TYPE property_type ADD VALUE IF NOT EXISTS 'apartment';
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    
    BEGIN
        ALTER TYPE property_type ADD VALUE IF NOT EXISTS 'villa';
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    
    BEGIN
        ALTER TYPE property_type ADD VALUE IF NOT EXISTS 'land';
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
END $$;

-- Set safe defaults for existing records
UPDATE properties SET 
    title = COALESCE(title, 'Property'),
    description = COALESCE(description, 'Property description'),
    price = COALESCE(price, 0),
    location = COALESCE(location, 'Location TBD'),
    property_type = COALESCE(property_type, 'house'),
    square_feet = COALESCE(square_feet, 0),
    featured = COALESCE(featured, false),
    agent_name = COALESCE(agent_name, 'John Ambrose'),
    agent_email = COALESCE(agent_email, 'info.mannadomeestate@gmail.com'),
    agent_phone = COALESCE(agent_phone, '+233200694805'),
    amenities = COALESCE(amenities, '[]'::jsonb),
    parking_spaces = COALESCE(parking_spaces, 0),
    furnished = COALESCE(furnished, false),
    pet_friendly = COALESCE(pet_friendly, false),
    -- Fixed utilities_included to use empty array instead of boolean
    utilities_included = COALESCE(utilities_included, ARRAY[]::text[]);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
