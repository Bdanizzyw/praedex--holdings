// GPS Geolocation Service
// Gets user's current location using browser Geolocation API

export const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn('Geolocation error:', error);
        // Return default location if user denies access
        resolve({
          lat: 40.7580, // NYC coordinates
          lng: -73.9855,
        });
      }
    );
  });
};

// Watch user's location in real-time
export const watchUserLocation = (
  callback: (location: { lat: number; lng: number }) => void
): number => {
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported');
    return -1;
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      callback({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => console.warn('Geolocation watch error:', error)
  );
};

// Stop watching location
export const stopWatchingLocation = (watchId: number) => {
  if (watchId >= 0) {
    navigator.geolocation.clearWatch(watchId);
  }
};
