-- Create testimonials table if it doesn't exist
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  -- Added featured column to match RLS policies
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample testimonials with Ghanaian names
-- Updated with realistic Ghanaian business people testimonials
INSERT INTO testimonials (name, content, rating, featured) VALUES
('Kwame Asante', 'Mannadome Estate helped me find the perfect commercial property for my business. Their professionalism and market knowledge are unmatched.', 5, true),
('Akosua Mensah', 'As a first-time homebuyer, I was nervous about the process. The team at Mannadome Estate guided me every step of the way. Highly recommended!', 5, true),
('Kofi Boateng', 'I have been investing in real estate for over 10 years, and Mannadome Estate consistently delivers quality properties with excellent returns.', 5, true),
('Ama Osei', 'The customer service is exceptional. They found me a beautiful family home in East Legon within my budget. Thank you for making my dream come true!', 5, false),
('Yaw Oppong', 'Professional, reliable, and trustworthy. Mannadome Estate sold my property quickly and at a great price. I will definitely use their services again.', 5, false),
('Efua Adjei', 'Their market reports and property valuations are always accurate. As a business owner, I appreciate their attention to detail and transparency.', 5, false)
ON CONFLICT DO NOTHING;
