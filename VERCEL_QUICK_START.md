# Vercel Frontend Deployment (2 minutes)

## You Already Have Vercel + GitHub Connected ✅

### Step 1: Deploy Frontend
1. Go to https://vercel.com dashboard
2. Click "Add New..." → "Project"
3. Find `praedex--holdings` in your GitHub repos
4. Click "Import"

### Step 2: Click "Deploy"
- Vercel auto-detects Next.js
- Build will take 2-3 minutes
- Done! Your frontend is live

### Step 3: Add Environment Variable for Backend
Once backend is deployed to Railway (see RAILWAY_SETUP.md):

1. Go to your Vercel project
2. Click "Settings" → "Environment Variables"
3. Add variable:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-railway-url/api
   ```
4. Click "Save"
5. Go to "Deployments" → Click "..." on latest → "Redeploy"

### Done! 🚀
Your app will be live at:
**https://praedex--holdings.vercel.app**

### Quick Test
1. Visit your Vercel URL
2. Click "Find Property" button
3. Properties should load from Railway backend
4. Look for console message: "✅ Backend API loaded X properties"

---

## Full Timeline
1. **Now**: Deploy to Railway (5 min) → Get backend URL
2. **Then**: Configure Vercel env variable (1 min) → Redeploy (2 min)
3. **Done**: Both services live globally!
