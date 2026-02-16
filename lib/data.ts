
// Combined data file with properties, hotels, land, and shortlets with GPS coordinates

export interface Property {
  // distance is usually computed later (e.g., from user location), so make it optional and typed
  distance?: number
  id: string
  type: 'property' | 'hotel' | 'land' | 'shortlet'
  title: string
  price: number
  location: {
    lat: number
    lng: number
    address: string
  }
  description: string
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  amenities?: string[]
  rating?: number
  reviews?: number
}

export const propertiesAndHotels: Property[] = [
  // PROPERTIES
  {
    id: 'prop-1',
    type: 'property',
    title: 'Luxury Downtown Apartment',
    price: 850000,
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: '123 Main St, Downtown',
    },
    description:
      'Stunning 3-bedroom luxury apartment in the heart of downtown. Features floor-to-ceiling windows, high-end finishes.',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    amenities: ['Pool', 'Gym', 'Rooftop', 'Concierge'],
  },
  {
    id: 'prop-2',
    type: 'property',
    title: 'Suburban Family Home',
    price: 620000,
    location: {
      lat: 40.758,
      lng: -73.9855,
      address: '456 Park Ave, Midtown',
    },
    description:
      'Beautiful 4-bedroom family home in a peaceful suburban community with modern kitchen.',
    bedrooms: 4,
    bathrooms: 2,
    sqft: 2200,
    amenities: ['Garden', 'Garage', 'Playground'],
  },
  {
    id: 'prop-3',
    type: 'property',
    title: 'Modern Studio',
    price: 420000,
    location: {
      lat: 40.7489,
      lng: -73.968,
      address: '789 5th Ave, Upper East Side',
    },
    description:
      'Sleek studio apartment ideal for young professionals. Contemporary design, in-unit washer/dryer.',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    amenities: ['Gym', 'WiFi', 'Laundry'],
  },
  {
    id: 'prop-4',
    type: 'property',
    title: 'Executive Penthouse',
    price: 1200000,
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: '1000 Park Ave South, Flatiron',
    },
    description:
      'Ultra-premium penthouse with panoramic city views and private rooftop terrace.',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3500,
    amenities: ['Rooftop', 'Smart Home', 'Private Elevator'],
  },
  {
    id: 'prop-5',
    type: 'property',
    title: 'Cozy Townhouse',
    price: 550000,
    location: {
      lat: 40.7282,
      lng: -73.7949,
      address: '234 Queens Blvd, Forest Hills',
    },
    description:
      'Charming 2-bedroom townhouse with modern updates. Includes garage and small garden.',
    bedrooms: 2,
    bathrooms: 1.5,
    sqft: 1200,
    amenities: ['Garage', 'Garden', 'Parking'],
  },
  {
    id: 'prop-6',
    type: 'property',
    title: 'Beachfront Villa',
    price: 1500000,
    location: {
      lat: 40.5731,
      lng: -73.9712,
      address: '567 Beach Road, Coney Island',
    },
    description:
      'Exclusive beachfront villa with direct ocean access and luxury finishes.',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 4000,
    amenities: ['Beach Access', 'Pool', 'Private Dock'],
  },

  // HOTELS
  {
    id: 'hotel-1',
    type: 'hotel',
    title: '⭐ The Plaza Hotel',
    price: 450,
    location: {
      lat: 40.7647,
      lng: -73.9776,
      address: '768 5th Avenue, Manhattan',
    },
    description:
      'Iconic luxury hotel with world-class service, premium rooms, and fine dining.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Spa', 'Restaurant', 'Room Service', 'WiFi'],
    rating: 4.8,
    reviews: 2350,
  },
  {
    id: 'hotel-2',
    type: 'hotel',
    title: '⭐⭐ Modern Times Hotel',
    price: 280,
    location: {
      lat: 40.7549,
      lng: -73.9841,
      address: '42 W 44th St, Times Square',
    },
    description:
      'Contemporary boutique hotel in the heart of Times Square with rooftop views.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Rooftop Bar', 'Gym', 'Lounge'],
    rating: 4.6,
    reviews: 1890,
  },
  {
    id: 'hotel-3',
    type: 'hotel',
    title: '⭐ Riverside Luxury Inn',
    price: 520,
    location: {
      lat: 40.7505,
      lng: -74.0072,
      address: '1 Riverside Drive, Upper West Side',
    },
    description:
      'Premium waterfront hotel with Hudson River views, spa, and fine dining.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Spa', 'Restaurant', 'River Views', 'Concierge'],
    rating: 4.9,
    reviews: 3100,
  },
  {
    id: 'hotel-4',
    type: 'hotel',
    title: '⭐⭐ Budget Comfort Stay',
    price: 120,
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: '200 Lexington Ave, Gramercy',
    },
    description:
      'Affordable, clean, and comfortable hotel perfect for budget travelers.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Breakfast', 'TV'],
    rating: 4.2,
    reviews: 1540,
  },
  {
    id: 'hotel-5',
    type: 'hotel',
    title: '⭐⭐ Downtown Boutique',
    price: 380,
    location: {
      lat: 40.7165,
      lng: -74.0043,
      address: '100 Chambers St, Tribeca',
    },
    description:
      'Trendy boutique hotel in Tribeca with modern design and vibrant atmosphere.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Bar', 'Lounge', 'Modern Design'],
    rating: 4.7,
    reviews: 2100,
  },
  {
    id: 'hotel-6',
    type: 'hotel',
    title: '⭐ Sunset Beach Resort',
    price: 650,
    location: {
      lat: 40.5731,
      lng: -73.9712,
      address: '888 Beach Boulevard, Coney Island',
    },
    description:
      'All-inclusive beach resort with water sports, restaurants, and ocean views.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Beach', 'Water Sports', 'Restaurant', 'Pool'],
    rating: 4.8,
    reviews: 2750,
  },

  // SHORTLETS (Short-term Rentals)
  {
    id: 'short-1',
    type: 'shortlet',
    title: '🏠 Cozy Brooklyn Shortlet',
    price: 85,
    location: {
      lat: 40.6501,
      lng: -73.9496,
      address: '123 Bedford Ave, Brooklyn',
    },
    description:
      'Beautiful 1-bedroom shortlet in trendy Brooklyn. Perfect for short stays.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Kitchen', 'Washer/Dryer'],
    rating: 4.7,
    reviews: 420,
  },
  {
    id: 'short-2',
    type: 'shortlet',
    title: '🏠 Manhattan Studio Shortlet',
    price: 120,
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: '456 5th Ave, Gramercy',
    },
    description:
      'Modern studio in Manhattan with great views. Ideal for business travelers.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'TV', 'Kitchenette'],
    rating: 4.6,
    reviews: 580,
  },
  {
    id: 'short-3',
    type: 'shortlet',
    title: '🏠 Queens Family Shortlet',
    price: 95,
    location: {
      lat: 40.7282,
      lng: -73.7949,
      address: '789 Family Lane, Forest Hills',
    },
    description:
      'Spacious 2-bedroom shortlet perfect for families. Close to parks and schools.',
    bedrooms: 2,
    bathrooms: 1.5,
    amenities: ['WiFi', 'Kitchen', 'Living Room'],
    rating: 4.8,
    reviews: 340,
  },
  {
    id: 'short-4',
    type: 'shortlet',
    title: '🏠 East Village Luxury Shortlet',
    price: 150,
    location: {
      lat: 40.7294,
      lng: -73.9829,
      address: '321 East Village Rd, East Village',
    },
    description:
      'High-end luxury shortlet in vibrant East Village. Great nightlife nearby.',
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['WiFi', 'AC', 'Premium Bedding'],
    rating: 4.9,
    reviews: 670,
  },
  {
    id: 'short-5',
    type: 'shortlet',
    title: '🏠 Upper West Side Shortlet',
    price: 110,
    location: {
      lat: 40.7505,
      lng: -74.0072,
      address: '555 Central Park West, Upper West Side',
    },
    description:
      'Beautiful shortlet with views of Central Park. Perfect location for tourists.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Park View', 'Doorman'],
    rating: 4.7,
    reviews: 520,
  },

  // LAND
  {
    id: 'land-1',
    type: 'land',
    title: '🏞️ Commercial Land Plot',
    price: 180000,
    location: {
      lat: 40.7505,
      lng: -74.0072,
      address: '100 Commercial Ave, Hudson Yards',
    },
    description:
      'Prime commercial land in Hudson Yards perfect for development. High foot traffic area.',
    sqft: 5000,
    amenities: ['Zoning Ready', 'High Traffic', 'Infrastructure Ready'],
    rating: 4.5,
    reviews: 320,
  },
  {
    id: 'land-2',
    type: 'land',
    title: '🏞️ Residential Land Development',
    price: 250000,
    location: {
      lat: 40.7282,
      lng: -73.7949,
      address: '234 Development Way, Forest Hills',
    },
    description:
      'Beautiful residential land for family development or investment. Great neighborhood.',
    sqft: 8000,
    amenities: ['Residential Zoned', 'Close to Schools', 'Parks Nearby'],
    rating: 4.6,
    reviews: 450,
  },
  {
    id: 'land-3',
    type: 'land',
    title: '🏞️ Waterfront Development Land',
    price: 520000,
    location: {
      lat: 40.5731,
      lng: -73.9712,
      address: '567 Waterfront Drive, Coney Island',
    },
    description:
      'Premium waterfront land with development potential. Ocean views and access.',
    sqft: 12000,
    amenities: ['Waterfront Access', 'Development Ready', 'Scenic Views'],
    rating: 4.9,
    reviews: 680,
  },
  {
    id: 'land-4',
    type: 'land',
    title: '🏞️ Industrial Lot',
    price: 95000,
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: '789 Industrial Park, Red Hook',
    },
    description:
      'Industrial land perfect for manufacturing or logistics. Near major highways.',
    sqft: 15000,
    amenities: ['Industrial Zoned', 'Highway Access', 'Utilities Available'],
    rating: 4.2,
    reviews: 220,
  },
  {
    id: 'land-5',
    type: 'land',
    title: '🏞️ Agricultural Land',
    price: 45000,
    location: {
      lat: 40.7165,
      lng: -74.0043,
      address: '100 Farm Road, Upstate',
    },
    description:
      'Fertile agricultural land ideal for farming or eco-tourism projects.',
    sqft: 20000,
    amenities: ['Fertile Soil', 'Water Source', 'Sunlight'],
    rating: 4.4,
    reviews: 190,
  },
]
