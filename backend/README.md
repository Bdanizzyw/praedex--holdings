# Praedex Holdings Backend

Backend API for the Praedex Holdings real estate application with GPS location tracking and nearest property finder.

## 🚀 Quick Start

### Install Dependencies
```bash
cd backend
npm install
```

### Start the Server
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## 📡 API Endpoints

### 1. Get All Properties
```bash
GET /api/properties
```

**With user location (sorts by distance):**
```bash
GET /api/properties?userLat=40.7580&userLng=-73.9855
```

**Response:**
```json
[
  {
    "id": "1",
    "title": "Luxury Downtown Apartment",
    "price": 850000,
    "lat": 40.7580,
    "lng": -73.9855,
    "distanceFromUser": 0.52
  }
]
```

---

### 2. Get Single Property
```bash
GET /api/properties/:id
```

**Example:**
```bash
GET /api/properties/1
```

---

### 3. Get Nearest Properties
```bash
GET /api/properties/nearest/:limit?userLat=40.7580&userLng=-73.9855
```

**Example (get 3 nearest properties):**
```bash
GET /api/properties/nearest/3?userLat=40.7580&userLng=-73.9855
```

---

### 4. Add New Property
```bash
POST /api/properties
Content-Type: application/json

{
  "title": "New Property",
  "price": 500000,
  "type": "apartment",
  "location": "Downtown",
  "lat": 40.7580,
  "lng": -73.9855
}
```

---

## 📍 GPS Features

- **Haversine Formula**: Accurate distance calculation between coordinates
- **Distance Sorting**: Properties automatically sorted by nearest first
- **Real-time Updates**: Distance calculated based on user's GPS location

## 🔧 Tech Stack

- Express.js - REST API server
- CORS - Cross-Origin Resource Sharing
- Haversine Formula - GPS distance calculation
- Node.js

## 📦 Project Structure

```
backend/
├── server.js              # Main Express server
├── package.json           # Dependencies
├── data/
│   └── properties.js      # Property data with coordinates
└── utils/
    └── distanceCalculator.js  # Distance calculation logic
```

## 🚀 Deployment

The backend can be deployed to:
- Heroku
- Railway
- Render
- AWS Lambda
- Google Cloud

## 📝 Environment Variables

Create a `.env` file:
```
PORT=5000
NODE_ENV=development
```

## 🔗 Frontend Integration

Frontend connects to:
```javascript
const API_URL = 'http://localhost:5000/api';
```

Update this in your Next.js app for production deployment.
