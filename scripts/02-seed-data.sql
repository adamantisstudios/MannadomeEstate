-- Insert default admin user (password: admin123 - should be changed in production)
INSERT INTO admin_users (email, password_hash, full_name, role) VALUES
('admin@lakesideestate.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample properties
INSERT INTO properties (
  title, description, price, location, property_type, bedrooms, bathrooms, 
  square_feet, lot_size, year_built, status, featured, images, amenities,
  agent_name, agent_phone, agent_email
) VALUES
(
  'Luxury Lakefront Villa',
  'Stunning 4-bedroom villa with panoramic lake views, modern amenities, and private dock. Perfect for luxury living with spacious rooms and premium finishes throughout.',
  850000.00,
  'East Legon, Accra',
  'Villa',
  4,
  3,
  3500,
  '0.5 acres',
  2022,
  'available',
  true,
  ARRAY['/luxury-villa-with-lake-view-ghana.png', '/luxury-villa-interior-1.png', '/luxury-villa-interior-2.png'],
  ARRAY['Swimming Pool', 'Private Dock', 'Garden', 'Garage', 'Security System', 'Air Conditioning'],
  'Kwame Asante',
  '+233 24 123 4567',
  'kwame@lakesideestate.com'
),
(
  'Modern Family House',
  'Beautiful 3-bedroom family home in a quiet neighborhood. Features modern kitchen, spacious living areas, and well-maintained garden.',
  450000.00,
  'Tema, Greater Accra',
  'House',
  3,
  2,
  2200,
  '0.25 acres',
  2020,
  'available',
  true,
  ARRAY['/modern-family-house-ghana.png'],
  ARRAY['Garden', 'Garage', 'Security System', 'Modern Kitchen'],
  'Akosua Mensah',
  '+233 24 234 5678',
  'akosua@lakesideestate.com'
),
(
  'Executive Apartment',
  'Luxurious 2-bedroom apartment in prime location with city views, modern amenities, and 24/7 security.',
  320000.00,
  'Airport Residential, Accra',
  'Apartment',
  2,
  2,
  1800,
  'N/A',
  2021,
  'available',
  false,
  ARRAY['/luxury-modern-house-with-lake-view-in-ghana.png'],
  ARRAY['City Views', '24/7 Security', 'Gym', 'Swimming Pool', 'Parking'],
  'Kofi Osei',
  '+233 24 345 6789',
  'kofi@lakesideestate.com'
),
(
  'Beachfront Cottage',
  'Charming 2-bedroom cottage just steps from the beach. Perfect for vacation home or rental investment.',
  280000.00,
  'Cape Coast',
  'Cottage',
  2,
  1,
  1200,
  '0.1 acres',
  2019,
  'sold',
  false,
  ARRAY['/luxury-villa-exterior.png'],
  ARRAY['Beach Access', 'Garden', 'Parking'],
  'Ama Boateng',
  '+233 24 456 7890',
  'ama@lakesideestate.com'
);

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_image, rating, testimonial, property_type, featured) VALUES
('Alice Ayoka', '/client-alice-ayoka.png', 5, 'Mannadome Estate helped me find my dream home! Their team was professional, knowledgeable, and made the entire process smooth and stress-free.', 'Villa', true),
('Kwame & Sarah Johnson', '/client-kwame-sarah.png', 5, 'Outstanding service from start to finish. They understood exactly what we were looking for and found us the perfect family home within our budget.', 'House', true),
('Charles Ashong', '/client-charles-ashong.png', 5, 'Professional, reliable, and trustworthy. Mannadome Estate exceeded my expectations in every way. Highly recommend their services!', 'Apartment', true),
('The Acquah Family', '/client-acquah-family.png', 5, 'We couldn''t be happier with our new home! The team at Mannadome Estate made our home buying journey enjoyable and memorable.', 'House', true),
('Ama Mensah', '/client-ama-mensah.png', 5, 'Excellent customer service and deep market knowledge. They helped me sell my property quickly and at a great price.', 'Villa', true),
('Emmanuel Boateng', '/client-emmanuel-boateng.png', 5, 'From our first meeting to closing day, Mannadome Estate provided exceptional service. They truly care about their clients.', 'Cottage', true);
