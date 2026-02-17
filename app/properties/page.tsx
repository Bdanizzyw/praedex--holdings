'use client'

import { useEffect, useState, useMemo } from 'react'
import { PropertyCard } from '@/components/PropertyCard'
import { propertiesAndHotels, Property } from '@/lib/data'
import { getUserLocation, calculateDistance, Coordinates } from '@/lib/gpsService'
import { getProperties } from '@/lib/api'

type LocationStatus = 'idle' | 'success' | 'denied' | 'unavailable'

export default function PropertiesPage() {
  const [items, setItems] = useState<(Property & { distance?: number })[]>([])
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const [loading, setLoading] = useState(false)
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle')
  const [filter, setFilter] = useState<'all' | 'property' | 'hotel' | 'land' | 'shortlet'>('all')

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await getProperties()
        const mapped = resp.map((p: any) => ({
          ...p,
          distance: p.distanceFromUser ?? undefined,
        }))
        setItems(mapped)
      } catch {
        setItems(propertiesAndHotels)
      }
      setUserLocation({ latitude: 40.7128, longitude: -74.006 })
    }
    load()
  }, [])

  const sortByDistance = (location: Coordinates) => {
    const withDistance = propertiesAndHotels.map((item) => ({
      ...item,
      distance: calculateDistance(location, item.location),
    }))
    withDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))
    return withDistance
  }

  const handleFindNearMe = async () => {
    setLoading(true)
    setLocationStatus('idle')

    try {
      const location = await getUserLocation()
      setUserLocation(location)
      setLocationStatus('success')

      try {
        const resp = await getProperties(location.latitude, location.longitude)
        const mapped = resp.map((p: any) => ({ ...p, distance: p.distanceFromUser ?? undefined }))
        setItems(mapped)
      } catch {
        setItems(sortByDistance(location))
      }
    } catch (err: any) {
      const isDenied = err.message?.toLowerCase().includes('denied')
      setLocationStatus(isDenied ? 'denied' : 'unavailable')

      const defaultLocation: Coordinates = { latitude: 40.7128, longitude: -74.006 }
      setItems(sortByDistance(defaultLocation))
    } finally {
      setLoading(false)
    }
  }

  const handleGetDirections = (item: Property) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${item.location.lat},${item.location.lng}&destination_place_id=${encodeURIComponent(item.title)}`
    window.open(url, '_blank')
  }

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items
    return items.filter((item) => item.type === filter)
  }, [items, filter])

  const countByType = (type: string) => items.filter((i) => i.type === type).length

  return (
    <main>
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              🏠 Properties & 🏨 Hotels Near You
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Find the perfect property or hotel at the best locations
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
              <button
                onClick={handleFindNearMe}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-bold transition flex items-center gap-2"
              >
                {loading ? '🔍 Finding...' : '📍 Find Near Me'}
              </button>

              {locationStatus === 'success' && (
                <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-2 rounded-lg flex items-center gap-2 self-center">
                  ✓ Showing results sorted by your location
                </div>
              )}

              {locationStatus === 'denied' && (
                <div className="bg-amber-50 border border-amber-300 text-amber-800 px-4 py-3 rounded-lg max-w-sm">
                  <p className="font-semibold">📍 Location access not available</p>
                  <p className="text-sm mt-1">
                    Showing results sorted by distance from New York instead. To use your exact location, allow location access in your browser and try again.
                  </p>
                </div>
              )}

              {locationStatus === 'unavailable' && (
                <div className="bg-amber-50 border border-amber-300 text-amber-800 px-4 py-3 rounded-lg max-w-sm">
                  <p className="font-semibold">📡 Couldn't detect your location</p>
                  <p className="text-sm mt-1">Showing all results instead. Try again or check your device's GPS settings.</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              {([
                { value: 'all', label: `All (${items.length})` },
                { value: 'property', label: `🏠 Properties (${countByType('property')})` },
                { value: 'hotel', label: `🏨 Hotels (${countByType('hotel')})` },
                { value: 'shortlet', label: `🏠 Shortlets (${countByType('shortlet')})` },
                { value: 'land', label: `🏞️ Land (${countByType('land')})` },
              ] as const).map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filter === value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

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
                No {filter === 'all' ? 'items' : filter}s found.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
