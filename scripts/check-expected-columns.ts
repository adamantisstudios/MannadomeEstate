// This script shows what columns your Property interface expects
// Compare this with the SQL query results above

interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  property_type: string
  status: string
  images: string[]
  amenities: string[]
  agent_name: string
  agent_phone: string
  agent_email: string
  created_at: string
  updated_at: string
}

console.log("Expected columns from Property interface:")
console.log(Object.keys({} as Property))

// Expected columns:
// - id (string)
// - title (string)
// - description (string)
// - price (number)
// - location (string)
// - bedrooms (number)
// - bathrooms (number)
// - area (number)
// - property_type (string)
// - status (string)
// - images (string[])
// - amenities (string[])
// - agent_name (string)
// - agent_phone (string)
// - agent_email (string)
// - created_at (string)
// - updated_at (string)
