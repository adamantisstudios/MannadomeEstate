-- Check current properties table schema
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'properties' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if properties table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'properties'
) as properties_table_exists;
