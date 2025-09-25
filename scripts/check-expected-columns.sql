-- This script shows what columns your Property interface expects
-- Compare this with the results from check-database-schema.sql

SELECT 'Expected Columns in Property Interface:' as info;

SELECT 
  'id' as column_name, 
  'string (UUID)' as expected_type,
  'Primary key' as description
UNION ALL
SELECT 'title', 'string', 'Property title'
UNION ALL
SELECT 'description', 'string', 'Property description'
UNION ALL
SELECT 'price', 'number', 'Property price'
UNION ALL
SELECT 'location', 'string', 'Property location'
UNION ALL
SELECT 'property_type', 'string', 'Type of property'
UNION ALL
SELECT 'bedrooms', 'number', 'Number of bedrooms'
UNION ALL
SELECT 'bathrooms', 'number', 'Number of bathrooms'
UNION ALL
SELECT 'square_feet', 'number', 'Square footage'
UNION ALL
SELECT 'lot_size', 'string', 'Lot size description'
UNION ALL
SELECT 'year_built', 'number', 'Year property was built'
UNION ALL
SELECT 'status', 'string', 'available, sold, or pending'
UNION ALL
SELECT 'featured', 'boolean', 'Whether property is featured'
UNION ALL
SELECT 'images', 'string[]', 'Array of image URLs'
UNION ALL
SELECT 'amenities', 'string[]', 'Array of amenities'
UNION ALL
SELECT 'agent_name', 'string', 'Agent name'
UNION ALL
SELECT 'agent_phone', 'string', 'Agent phone number'
UNION ALL
SELECT 'agent_email', 'string', 'Agent email address'
UNION ALL
SELECT 'created_at', 'string', 'Creation timestamp'
UNION ALL
SELECT 'updated_at', 'string', 'Last update timestamp'
ORDER BY column_name;
