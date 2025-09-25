-- Add missing agent columns to properties table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS agent_name TEXT,
ADD COLUMN IF NOT EXISTS agent_phone TEXT,
ADD COLUMN IF NOT EXISTS agent_email TEXT;

-- Updated with specific agent information provided by user
-- Update existing properties with default agent info (optional)
UPDATE properties 
SET 
  agent_name = 'John Ambrose',
  agent_phone = '+233200694805',
  agent_email = 'info.mannadomeestate@gmail.com'
WHERE agent_name IS NULL;
