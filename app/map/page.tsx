'use client'

import { useState, useEffect } from 'react'
import { propertiesAndHotels, Property } from '@/lib/data'
import { calculateDistance, Coordinates, getUserLocation } from '@/lib/gpsService'

export default function MapPage() {
  const [filter, setFilter] = useState<'all' | 'property' | 'hotel' | 'land' | 'shortlet'>('all')
  const [userLocation, setUserLocation] = useState<Coordinates>({
    latitude: 40.7128,
    longitude: -74.006,
  })
  const [nearbyItems, setNearbyItems] = useState<(Property & { distance?: number })[]>([])
  const [selectedItem, setSelectedItem] = useState<Property | null>(null)
  const [loading, setLoading] = useState(false)
  const [userLocationDetected, setUserLocationDetected] = useState(false)

  // Calculate nearby items on mount
  useEffect(() => {
    const itemsWithDistance = propertiesAndHotels.map((item) => ({
      ...item,
      distance: calculateDistance(userLocation, item.location),
    }))

    // Sort by distance
    itemsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))
    setNearbyItems(itemsWithDistance)
    
    // Auto-select the closest item
    if (itemsWithDistance.length > 0) {
      setSelectedItem(itemsWithDistance[0])
    }
  }, [userLocation])

  // Handle Find Near Me button
  const handleFindNearMe = async () => {
    setLoading(true)
    try {
      const location = await getUserLocation()
      setUserLocation(location)
      setUserLocationDetected(true)
    } catch (error) {
      console.error('Error getting location:', error)
      alert('Could not get your location. Please enable GPS and try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = nearbyItems.filter((item) => {
    const matchesType = filter === 'all' || item.type === filter
    return matchesType
  })

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'property': return '🏠'
      case 'hotel': return '🏨'
      case 'land': return '🏞️'
      case 'shortlet': return '🏢'
      default: return '📍'
    }
  }

  // Calculate pin position on map based on lat/lng
  const getMapPinPosition = (item: Property) => {
    const lats = propertiesAndHotels.map(p => p.location.lat)
    const lngs = propertiesAndHotels.map(p => p.location.lng)
    
    const latRange = Math.max(...lats) - Math.min(...lats)
    const lngRange = Math.max(...lngs) - Math.min(...lngs)
    const minLat = Math.min(...lats)
    const minLng = Math.min(...lngs)
    
    const x = ((item.location.lng - minLng) / lngRange) * 90 + 5
    const y = ((item.location.lat - minLat) / latRange) * 90 + 5
    
    return { x, y }
  }

  // Calculate user location pin position
  const getUserPinPosition = () => {
    const lats = propertiesAndHotels.map(p => p.location.lat)
    const lngs = propertiesAndHotels.map(p => p.location.lng)
    
    const latRange = Math.max(...lats) - Math.min(...lats)
    const lngRange = Math.max(...lngs) - Math.min(...lngs)
    const minLat = Math.min(...lats)
    const minLng = Math.min(...lngs)
    
    const x = ((userLocation.longitude - minLng) / lngRange) * 90 + 5
    const y = ((userLocation.latitude - minLat) / latRange) * 90 + 5
    
    return { x, y }
  }

  const userPin = getUserPinPosition()

  return (
    <main className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Full Screen Map */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 overflow-hidden">
        
        {/* Map Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Find Near Me Button - Top Center */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={handleFindNearMe}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transition flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">🔄</span>
                Finding...
              </>
            ) : (
              <>
                <span>📍</span>
                Find Near Me
              </>
            )}
          </button>
        </div>

        {/* User Location Indicator - Top Right */}
        {userLocationDetected && (
          <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
            </span>
            <span className="text-sm font-semibold">Live Location</span>
          </div>
        )}

        {/* Filter Tabs - Top Left */}
        <div className="absolute top-6 left-6 flex gap-2 bg-white rounded-lg shadow-lg p-2 z-20 flex-wrap max-w-xs">
          {[
            { id: 'all', label: 'All', icon: '📍' },
            { id: 'property', label: 'Apartments', icon: '🏠' },
            { id: 'hotel', label: 'Hotels', icon: '🏨' },
            { id: 'shortlet', label: 'Shortlets', icon: '🏢' },
            { id: 'land', label: 'Land', icon: '🏞️' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-2 py-1 rounded text-sm font-semibold transition ${
                filter === btn.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* User Location Pin */}
        {userLocationDetected && (
          <div
            className="absolute z-15 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ left: `${userPin.x}%`, top: `${userPin.y}%` }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full opacity-30 animate-ping" style={{ width: '40px', height: '40px', marginLeft: '-20px', marginTop: '-20px' }}></div>
              <div className="text-3xl">📍</div>
            </div>
          </div>
        )}

        {/* Property Pins on Map */}
        {filteredItems.map((item) => {
          const pos = getMapPinPosition(item)
          const isSelected = selectedItem?.id === item.id
          
          return (
            <div
              key={item.id}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-125"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className={`text-3xl transition ${isSelected ? 'scale-150 drop-shadow-2xl' : 'drop-shadow-lg hover:scale-110'}`}>
                {getTypeIcon(item.type)}
              </div>
              {isSelected && (
                <div className="absolute w-8 h-8 border-2 border-blue-600 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              )}
            </div>
          )
        })}
        {/* Selected Property Info Card - Bottom Right */}
        {selectedItem && (
          <div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-5 w-96 border-2 border-blue-300 z-20 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{getTypeIcon(selectedItem.type)}</span>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{selectedItem.title}</h3>
                <p className="text-xs text-gray-500">{selectedItem.type.toUpperCase()}</p>
              </div>
            </div>

         {/* Address and Distance */}
<div className="mb-3 text-sm">
  <p className="text-gray-600">📍 {selectedItem.location.address}</p>
  {selectedItem.distance !== undefined && (
    <p className="text-blue-600 font-bold mt-1">
      {selectedItem.distance.toFixed(1)}km away
    </p>
  )}
</div>
            {/* Price and Rating */}
            <div className="flex justify-between items-center mb-3 pb-3 border-b">
              <p className="font-bold text-lg text-blue-600">
                ${selectedItem.price.toLocaleString()}
                {selectedItem.type === 'hotel' || selectedItem.type === 'shortlet' ? '/night' : ''}
              </p>
              {selectedItem.rating && (
                <span className="text-sm">⭐ {selectedItem.rating}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{selectedItem.description}</p>

            {/* Amenities */}
            {selectedItem.amenities && selectedItem.amenities.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-1">
                {selectedItem.amenities.slice(0, 3).map((amenity, idx) => (
                  <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {amenity}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(selectedItem.location.address)}/@${selectedItem.location.lat},${selectedItem.location.lng},15z`
                  window.open(mapsUrl, '_blank')
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold transition"
              >
                📍 Directions
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold transition">
                📞 Contact
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-600 text-lg font-semibold">No properties found</p>
              <p className="text-gray-500 text-sm">Adjust filters or click "Find Near Me"</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
