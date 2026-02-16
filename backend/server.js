const express = require('express');
const cors = require('cors');
require('dotenv').config();

const properties = require('./data/properties');
const calculateDistance = require('./utils/distanceCalculator');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit payload size for security

// Validation helpers
const isValidCoordinate = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= -180 && num <= 180;
};

const isValidPropertyId = (id) => {
  return typeof id === 'string' && id.trim().length > 0 && id.length < 100;
};

const isValidPrice = (price) => {
  const num = parseFloat(price);
  return !isNaN(num) && num > 0 && num < 1000000000; // Max 1B
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// Get all properties (optional: sorted by distance if userLat & userLng provided)
app.get('/api/properties', (req, res) => {
  try {
    const { userLat, userLng } = req.query;

    // Validate coordinates if provided
    if ((userLat || userLng) && (!isValidCoordinate(userLat) || !isValidCoordinate(userLng))) {
      return res.status(400).json({ error: 'Invalid coordinates. Must be valid latitude/longitude.' });
    }

    let propertiesWithDistance = properties.map((property) => ({
      ...property,
      distanceFromUser: userLat && userLng
        ? calculateDistance(parseFloat(userLat), parseFloat(userLng), property.lat, property.lng)
        : null,
    }));

    // Sort by distance if user location provided
    if (userLat && userLng) {
      propertiesWithDistance.sort((a, b) => a.distanceFromUser - b.distanceFromUser);
    }

    res.json(propertiesWithDistance);
  } catch (err) {
    console.error('Error in /api/properties:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single property by ID
app.get('/api/properties/:id', (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!isValidPropertyId(id)) {
      return res.status(400).json({ error: 'Invalid property ID format.' });
    }

    const property = properties.find((p) => p.id === id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    console.error('Error in /api/properties/:id:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get nearest properties to user location
app.get('/api/properties/nearest/:limit', (req, res) => {
  try {
    const { userLat, userLng } = req.query;
    const limitNum = parseInt(req.params.limit, 10);

    // Validate inputs
    if (!userLat || !userLng || !isValidCoordinate(userLat) || !isValidCoordinate(userLng)) {
      return res.status(400).json({ error: 'userLat and userLng query parameters required and must be valid coordinates' });
    }

    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({ error: 'Limit must be between 1 and 100' });
    }

    const propertiesWithDistance = properties.map((property) => ({
      ...property,
      distanceFromUser: calculateDistance(
        parseFloat(userLat),
        parseFloat(userLng),
        property.lat,
        property.lng
      ),
    }));

    propertiesWithDistance.sort((a, b) => a.distanceFromUser - b.distanceFromUser);

    res.json(propertiesWithDistance.slice(0, limitNum));
  } catch (err) {
    console.error('Error in /api/properties/nearest/:limit:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new property (placeholder for future database integration)
app.post('/api/properties', (req, res) => {
  try {
    const { title, price, type, location, lat, lng } = req.body;

    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Valid title is required' });
    }

    if (!price || !isValidPrice(price)) {
      return res.status(400).json({ error: 'Valid price is required (0 < price < 1B)' });
    }

    if (!isValidCoordinate(lat) || !isValidCoordinate(lng)) {
      return res.status(400).json({ error: 'Valid lat and lng coordinates are required' });
    }

    const newProperty = {
      id: `prop-${Date.now()}`, // Use timestamp for unique ID
      title: title.trim(),
      price: parseFloat(price),
      distance: location && typeof location === 'string' ? location.trim() : 'Location pending',
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      description: 'New property listing',
      bedrooms: 0,
      bathrooms: 0,
      sqft: 0,
    };

    properties.push(newProperty);
    res.status(201).json(newProperty);
  } catch (err) {
    console.error('Error in POST /api/properties:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`📍 API endpoints:`);
  console.log(`   GET  /api/properties`);
  console.log(`   GET  /api/properties/:id`);
  console.log(`   GET  /api/properties/nearest/:limit?userLat=40&userLng=-73`);
  console.log(`   POST /api/properties`);
});
