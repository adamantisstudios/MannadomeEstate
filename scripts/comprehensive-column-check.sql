-- Check for ALL missing columns by comparing expected vs actual
WITH expected_columns AS (
    SELECT unnest(ARRAY[
        'id', 'title', 'description', 'price', 'location', 'bedrooms', 'bathrooms', 
        'square_feet', 'property_type', 'status', 'images', 'created_at', 'updated_at',
        'agent_name', 'agent_email', 'agent_phone', 'amenities', 'virtual_tour_url',
        'year_built', 'lot_size', 'parking_spaces', 'furnished', 'pet_friendly',
        'utilities_included', 'neighborhood_info', 'nearby_schools', 'transportation_access',
        'hoa_fees', 'property_taxes', 'featured'
    ]) AS expected_column
),
actual_columns AS (
    SELECT column_name AS actual_column
    FROM information_schema.columns 
    WHERE table_name = 'properties'
)
SELECT 
    e.expected_column,
    CASE WHEN a.actual_column IS NULL THEN 'MISSING' ELSE 'EXISTS' END AS status
FROM expected_columns e
LEFT JOIN actual_columns a ON e.expected_column = a.actual_column
ORDER BY status DESC, e.expected_column;
