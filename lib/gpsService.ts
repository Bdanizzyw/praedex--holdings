// GPS Service for getting user location and calculating distances

export interface Location {
  lat: number
  lng: number
}

export interface Coordinates {
  latitude: number
  longitude: number
}

// Haversine formula to calculate distance between two points (in km)
export function calculateDistance(
  userLoc: Coordinates,
  propertyLoc: Location
): number {
  const R = 6371 // Earth's radius in km
  const dLat = (propertyLoc.lat - userLoc.latitude) * (Math.PI / 180)
  const dLng = (propertyLoc.lng - userLoc.longitude) * (Math.PI / 180)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLoc.latitude * (Math.PI / 180)) *
      Math.cos(propertyLoc.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return parseFloat(distance.toFixed(2))
}

// Get user's current location via GPS with better error handling
export function getUserLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
      return
    }

    // Check if permission is already denied
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permission) => {
          if (permission.state === 'denied') {
            reject(
              new Error(
                'Location permission denied. Please enable location access in browser settings.'
              )
            )
            return
          }
          requestPosition()
        })
        .catch(() => {
          // Fallback for browsers that don't support permissions API
          requestPosition()
        })
    } else {
      requestPosition()
    }

    function requestPosition() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          let message = 'Could not get your location'
          if (error.code === error.PERMISSION_DENIED) {
            message =
              'Location permission denied. Enable location in browser settings.'
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            message = 'Location information is unavailable.'
          } else if (error.code === error.TIMEOUT) {
            message = 'Location request timed out.'
          }
          reject(new Error(message))
        },
        {
          timeout: 10000,
          enableHighAccuracy: false, // Faster, less accurate
        }
      )
    }
  })
}

// Generate Google Maps directions URL
export function getDirectionsUrl(
  destination: Location,
  destinationName: string
): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}&destination_place_id=${destinationName}`
}
