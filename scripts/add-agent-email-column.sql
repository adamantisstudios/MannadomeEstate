-- Add missing agent_email column to properties table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS agent_email VARCHAR(255);

-- Update existing records with a default agent email if needed
UPDATE properties 
SET agent_email = 'info@mannadomestate.com' 
WHERE agent_email IS NULL;
