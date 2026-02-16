'use client'

// Property details page. Fetches property from backend API when available,
// falls back to local mock data.

import React, { useEffect, useState } from 'react'
import { propertiesAndHotels } from '@/lib/data'
import { getPropertyById } from '@/lib/api'

const mockProperties: { [key: string]: any } = {
  '1': {
    id: '1',
    title: 'Luxury Downtown Apartment',
    price: 850000,
    distance: '2.5 km from city center',
    description:
      'Stunning 3-bedroom luxury apartment in the heart of downtown. Features floor-to-ceiling windows, high-end finishes, and access to premium amenities. Perfect for investors seeking steady rental income.',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
  },
  '2': {
    id: '2',
    title: 'Suburban Family Home',
    price: 620000,
    distance: '15 km from city center',
    description:
      'Beautiful 4-bedroom family home in a peaceful suburban community. Large backyard, modern kitchen, and excellent schools nearby. Great for long-term investment.',
    bedrooms: 4,
    bathrooms: 2,
    sqft: 2200,
  },
  '3': {
    id: '3',
    title: 'Modern Studio',
    price: 420000,
    distance: '1.2 km from city center',
    description:
      'Sleek studio apartment ideal for young professionals. Contemporary design, in-unit washer/dryer, and vibrant neighborhood. High rental demand.',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
  },
  '4': {
    id: '4',
    title: 'Executive Penthouse',
    price: 1200000,
    distance: '3 km from city center',
    description:
      'Ultra-premium penthouse with panoramic city views. Includes private rooftop terrace, smart home technology, and concierge service. Premium investment property.',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3500,
  },
  '5': {
    id: '5',
    title: 'Cozy Townhouse',
    price: 550000,
    distance: '8 km from city center',
    description:
      'Charming 2-bedroom townhouse with modern updates. Includes garage, small garden, and community amenities. Solid investment with steady appreciation.',
    bedrooms: 2,
    bathrooms: 1.5,
    sqft: 1200,
  },
  '6': {
    id: '6',
    title: 'Beachfront Villa',
    price: 1500000,
    distance: '20 km from city center',
    description:
      'Exclusive beachfront villa with direct ocean access. 4 bedrooms, infinity pool, and luxury finishes. Perfect for vacation rentals and premium investors.',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 4000,
  },
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<any | null>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        console.log(`🔄 Fetching property ${params.id} from backend API...`)
        const fromApi = await getPropertyById(params.id)
        if (mounted && fromApi) {
          setProperty(fromApi)
          console.log('✅ Backend API loaded property:', fromApi.title)
          return
        }
      } catch (err) {
        // ignore and fall back
        console.log(`⚠️ Backend API failed for property ${params.id}, using local data`)
      }

      // fallback to local dataset (some ids are numeric strings)
      const found = propertiesAndHotels.find((p) => p.id === params.id)
      setProperty(found ?? mockProperties[params.id] ?? null)
    }

    load()
    return () => {
      mounted = false
    }
  }, [params.id])

  if (!property) {
    return (
      <main>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Property not found</h1>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Property Image */}
          <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-8">
            <span className="text-white text-6xl">🏠</span>
          </div>

          {/* Property Info */}
          <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
          <p className="text-gray-600 mb-6">📍 {property.location?.address ?? property.distance}</p>

          {/* Price and Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b">
            <div>
              <p className="text-gray-600">Price</p>
              <p className="text-3xl font-bold text-blue-600">
                ${property.price.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Property Details</p>
              <p className="text-lg">
                {property.bedrooms ?? '-'} bed • {property.bathrooms ?? '-'} bath • {(property.sqft || 0).toLocaleString()} sqft
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Property</h2>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          {/* Map Placeholder */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
              <span className="text-gray-500 text-lg">Map Placeholder</span>
            </div>
          </div>

          {/* Contact Button */}
          <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition">
            Contact Landlord
          </button>
        </div>
      </section>
    </main>
  )
}
