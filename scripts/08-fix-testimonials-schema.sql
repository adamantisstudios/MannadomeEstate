-- Fix testimonials table schema to ensure consistency
-- New script to handle existing data and add missing column

-- Add featured column if it doesn't exist
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Update existing testimonials to have some featured ones
UPDATE testimonials SET featured = true WHERE name IN ('Kwame Asante', 'Akosua Mensah', 'Kofi Boateng');

-- Create index for featured testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
