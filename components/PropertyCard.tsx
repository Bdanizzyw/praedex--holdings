// PropertyCard component with support for properties AND hotels with GPS distance
// Optimized with React.memo to prevent unnecessary re-renders

import Link from 'next/link'
import React from 'react'

interface PropertyCardProps {
  id: string
  type: 'property' | 'hotel' | 'land' | 'shortlet'
  title: string
  price: number
  distance?: number
  rating?: number
  reviews?: number
  onDirections?: () => void
}

const PropertyCardComponent = ({
  id,
  type,
  title,
  price,
  distance,
  rating,
  reviews,
  onDirections,
}: PropertyCardProps) => {
  const isHotel = type === 'hotel'
  const icon = isHotel ? '🏨' : '🏠'
  const bgColor = isHotel
    ? 'from-purple-400 to-purple-600'
    : 'from-blue-400 to-blue-600'

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer h-full flex flex-col">
      {/* Image Placeholder */}
      <div
        className={`w-full h-48 bg-gradient-to-br ${bgColor} flex items-center justify-center`}
      >
        <span className="text-white text-4xl">{icon}</span>
      </div>

      {/* Card Content */}
      <Link href={`/properties/${id}`} className="flex-grow">
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className={`text-2xl font-bold mb-2 ${isHotel ? 'text-purple-600' : 'text-blue-600'}`}>
            ${price.toLocaleString()}
            {isHotel && <span className="text-xs font-normal text-gray-500">/night</span>}
          </p>

          {/* Distance */}
          {distance !== undefined && (
            <p className="text-sm text-gray-600 mb-2">
              📍 {distance.toFixed(1)} km away
            </p>
          )}

          {/* Rating for Hotels */}
          {isHotel && rating && (
            <div className="flex items-center gap-1 text-sm mb-2">
              <span className="text-yellow-500">⭐ {rating}</span>
              <span className="text-gray-500">({reviews} reviews)</span>
            </div>
          )}
        </div>
      </Link>

      {/* Directions Button */}
      {onDirections && (
        <button
          onClick={onDirections}
          className="mx-4 mb-4 w-[calc(100%-2rem)] bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold text-sm transition"
        >
          📍 Get Directions
        </button>
      )}
    </div>
  )
}

// Memoize component to prevent re-renders when props haven't changed
export const PropertyCard = React.memo(PropertyCardComponent)
