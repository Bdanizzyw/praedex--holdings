// API Service for Praedex Holdings Backend
// Handles all communication with the backend API with proper error handling and type safety.
// Includes caching to reduce API calls.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Simple cache to avoid duplicate API calls
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface ApiError {
  message: string;
  status?: number;
}

interface Property {
  id: string;
  title: string;
  price: number;
  distance?: string;
  lat: number;
  lng: number;
  distanceFromUser?: number;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  type?: 'property' | 'hotel' | 'land' | 'shortlet';
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

// Helper function to handle API responses
const handleApiResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    let errorData;
    
    try {
      if (contentType?.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData = { error: response.statusText };
      }
    } catch {
      errorData = { error: `HTTP ${response.status}` };
    }

    const error: ApiError = {
      message: errorData?.error || `API Error: ${response.status}`,
      status: response.status,
    };

    throw error;
  }

  return await response.json();
};

// Cache helper
const getCached = (key: string): any | null => {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  delete cache[key];
  return null;
};

const setCache = (key: string, data: any): void => {
  cache[key] = { data, timestamp: Date.now() };
};

// Get all properties (optionally sorted by distance)
export const getProperties = async (
  userLat?: number,
  userLng?: number
): Promise<Property[]> => {
  try {
    const params = new URLSearchParams();
    
    if (userLat !== undefined && userLng !== undefined) {
      // Validate coordinates
      if (typeof userLat === 'number' && typeof userLng === 'number') {
        params.append('userLat', userLat.toString());
        params.append('userLng', userLng.toString());
      }
    }

    const cacheKey = `properties-${params.toString()}`;
    const cached = getCached(cacheKey);
    if (cached) {
      return cached;
    }

    const url = `${API_BASE_URL}/properties${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await handleApiResponse(response);
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

// Get single property by ID
export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    // Basic ID validation
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw { message: 'Invalid property ID' };
    }

    const cacheKey = `property-${id}`;
    const cached = getCached(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await fetch(`${API_BASE_URL}/properties/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await handleApiResponse(response);
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};

// Get nearest properties to user location
export const getNearestProperties = async (
  userLat: number,
  userLng: number,
  limit: number = 5
): Promise<Property[]> => {
  try {
    // Validate inputs
    if (typeof userLat !== 'number' || typeof userLng !== 'number') {
      throw { message: 'Invalid coordinates provided' };
    }
    
    if (typeof limit !== 'number' || limit < 1 || limit > 100) {
      throw { message: 'Limit must be between 1 and 100' };
    }

    const cacheKey = `nearest-${userLat}-${userLng}-${limit}`;
    const cached = getCached(cacheKey);
    if (cached) {
      return cached;
    }

    const url = `${API_BASE_URL}/properties/nearest/${limit}?userLat=${userLat}&userLng=${userLng}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await handleApiResponse(response);
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching nearest properties:', error);
    throw error;
  }
};

// Add new property
export const addProperty = async (propertyData: {
  title: string;
  price: number;
  type?: string;
  location?: string;
  lat: number;
  lng: number;
}): Promise<Property | null> => {
  try {
    // Validate required fields
    if (!propertyData.title || typeof propertyData.title !== 'string') {
      throw { message: 'Valid title is required' };
    }
    
    if (!propertyData.price || propertyData.price <= 0) {
      throw { message: 'Valid price is required' };
    }
    
    if (typeof propertyData.lat !== 'number' || typeof propertyData.lng !== 'number') {
      throw { message: 'Valid coordinates are required' };
    }

    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: propertyData.title.trim(),
        price: propertyData.price,
        type: propertyData.type || 'property',
        location: propertyData.location || '',
        lat: propertyData.lat,
        lng: propertyData.lng,
      }),
    });

    const data = await handleApiResponse(response);
    // Invalidate cache when adding new property
    Object.keys(cache).forEach(key => {
      if (key.startsWith('properties')) {
        delete cache[key];
      }
    });
    return data;
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

// Health check
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.ok;
  } catch {
    return false;
  }
};
