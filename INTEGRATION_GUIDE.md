# Frontend-Backend Integration Verification

This guide shows how to verify that the frontend is successfully communicating with the backend API.

## Setup

1. **Start the backend** (Terminal 1):
```bash
npm run dev:backend
```
Expected output:
```
✅ Backend server running on http://localhost:5000
📍 API endpoints:
   GET  /api/properties
   GET  /api/properties/:id
   GET  /api/properties/nearest/:limit?userLat=40&userLng=-73
   POST /api/properties
```

2. **Verify backend is healthy** (Terminal 2):
```bash
npm run verify:backend
```
Expected output:
```
✅ All backend endpoints verified successfully!
```

3. **Start the frontend** (Terminal 3):
```bash
npm run dev
```
Expected output:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3006
```

## Testing Frontend-Backend Integration

### 1. **Check Browser Console Logs**
Open http://localhost:3006 in your browser:
- Press `F12` or `Ctrl+Shift+I` to open DevTools
- Go to the **Console** tab
- Navigate to **Properties** page

**Expected logs:**
```
🔄 Fetching properties from backend API...
✅ Backend API loaded 17 properties
```

If you see `⚠️ Backend API failed`, the frontend fell back to local mock data (backend wasn't available).

### 2. **Test Backend API Directly**

```bash
# Get all properties
curl http://localhost:5000/api/properties

# Get properties sorted by distance from NYC
curl "http://localhost:5000/api/properties?userLat=40.7128&userLng=-74.006"

# Get single property
curl http://localhost:5000/api/properties/prop-1

# Health check
curl http://localhost:5000/api/health
```

### 3. **Check Network Requests in Browser**
- Open DevTools (F12)
- Go to **Network** tab
- Refresh the page
- Look for requests to `http://localhost:5000/api/properties` or similar

You should see:
- Status: 200 OK (successful)
- Response: JSON array of properties

### 4. **Test Property Details Page**
1. Go to http://localhost:3006/properties
2. Click on any property card
3. Check the console (F12) for logs:
```
🔄 Fetching property prop-1 from backend API...
✅ Backend API loaded property: Luxury Downtown Apartment
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Backend API failed, using local mock data" | Make sure `npm run dev:backend` is running on port 5000 |
| Properties page is empty | Check backend logs for errors; try refreshing the page |
| Console shows 404 errors | Verify the API URL in `lib/api.ts` matches your backend (`http://localhost:5000/api`) |
| CORS errors | This is normal; the backend has CORS enabled for development |

## API Fallback Behavior

- **When backend is available:** Frontend fetches real data from API (logs show ✅)
- **When backend is down:** Frontend automatically uses local mock data (logs show ⚠️)
- **No manual intervention needed** — just ensure the backend is running for full integration

## Next Steps

Once verified:
1. ✅ Backend is running and healthy
2. ✅ Frontend fetches from backend
3. ✅ Local fallback works

You can now:
- Add more properties to `backend/data/properties.js`
- Deploy to production
- Add authentication, search filters, etc.
