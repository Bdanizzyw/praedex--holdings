'use client'

import { useEffect, useState, useMemo } from 'react'
import { PropertyCard } from '@/components/PropertyCard'
import { propertiesAndHotels, Property } from '@/lib/data'
import { getUserLocation, calculateDistance, Coordinates } from '@/lib/gpsService'
import { getProperties } from '@/lib/api'

export default function PropertiesPage() {
  const [items, setItems] = useState<(Property & { distance?: number })[]>([])
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const [loading, setLoading] = useState(false)
  const [showNearMe, setShowNearMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'property' | 'hotel' | 'land' | 'shortlet'>('all')

  // Initialize with mock location (NYC center)
  useEffect(() => {
    // Try to fetch from backend API; fall back to local mock data
    const load = async () => {
      try {
        console.log('🔄 Fetching properties from backend API...')
        const resp = await getProperties()
        const mapped = resp.map((p: any) => ({
          ...p,
          // API returns `distanceFromUser` when queried with coords
          distance: p.distanceFromUser ?? undefined,
        }))
        setItems(mapped)
        console.log('✅ Backend API loaded', mapped.length, 'properties')
      } catch (err) {
        console.log('⚠️ Backend API failed, using local mock data:', err)
        setItems(propertiesAndHotels)
      }
      // Default to NYC coordinates for demo
      setUserLocation({
        latitude: 40.7128,
        longitude: -74.006,
      })
    }

    load()
  }, [])

  const handleFindNearMe = async () => {
    setLoading(true)
    setError(null)

    try {
      const location = await getUserLocation()
      setUserLocation(location)
      setShowNearMe(true)

      // Ask backend for properties sorted by distance (if backend available)
      try {
        const resp = await getProperties(location.latitude, location.longitude)
        const mapped = resp.map((p: any) => ({ ...p, distance: p.distanceFromUser ?? undefined }))
        setItems(mapped)
      } catch (err) {
        // Fallback: calculate locally
        const itemsWithDistance = propertiesAndHotels.map((item) => ({
          ...item,
          distance: calculateDistance(location, item.location),
        }))
        itemsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))
        setItems(itemsWithDistance)
      }
    } catch (err: any) {
      setError(
        err.message || 'Could not get your location. Please enable GPS.'
      )
      // Fallback: show all items with pre-calculated distances
      const defaultLocation: Coordinates = {
        latitude: 40.7128,
        longitude: -74.006,
      }
      const itemsWithDistance = propertiesAndHotels.map((item) => ({
        ...item,
        distance: calculateDistance(defaultLocation, item.location),
      }))
      itemsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))
      setItems(itemsWithDistance)
    } finally {
      setLoading(false)
    }
  }

  const handleGetDirections = (item: Property) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.location.lat},${item.location.lng}&destination_place_id=${encodeURIComponent(item.title)}`
    window.open(mapsUrl, '_blank')
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filter === 'all') return true
      return item.type === filter
    })
  }, [items, filter])

  return (
    <main>
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              🏠 Properties & 🏨 Hotels Near You
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Find the perfect property or hotel at the best locations
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <button
                onClick={handleFindNearMe}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-bold transition flex items-center gap-2"
              >
                {loading ? '🔍 Finding...' : '📍 Find Near Me'}
              </button>

              {userLocation && showNearMe && (
                <div className="bg-blue-100 border border-blue-400 text-blue-800 px-4 py-2 rounded-lg">
                  ✓ Showing results near your location
                </div>
              )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg">
                <p className="font-semibold mb-2">⚠️ {error}</p>
                {error.includes('permission denied') || error.includes('Location permission') ? (
                  <p className="text-sm">
                    <strong>Fix:</strong> Click the location icon 📍 in your browser's address bar (or padlock icon) → "Site settings" → "Location" → Set to "Allow"
                  </p>
                ) : null}
              </div>
            )}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All ({filteredItems.length})
              </button>
              <button
                onClick={() => setFilter('property')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'property'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🏠 Properties ({items.filter((i) => i.type === 'property').length})
              </button>
              <button
                onClick={() => setFilter('hotel')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'hotel'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🏨 Hotels ({items.filter((i) => i.type === 'hotel').length})
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <PropertyCard
                key={item.id}
                id={item.id}
                type={item.type}
                title={item.title}
                price={item.price}
                distance={item.distance}
                rating={item.rating}
                reviews={item.reviews}
                onDirections={() => handleGetDirections(item)}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No {filter === 'all' ? 'items' : filter} found.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
