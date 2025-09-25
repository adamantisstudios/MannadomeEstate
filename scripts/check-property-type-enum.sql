-- Check what enum values are allowed for property_type
SELECT 
    t.typname AS enum_name,
    e.enumlabel AS enum_value
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
WHERE t.typname = 'property_type'
ORDER BY e.enumsortorder;

-- Also check current property types in use
SELECT DISTINCT property_type 
FROM properties 
WHERE property_type IS NOT NULL;
