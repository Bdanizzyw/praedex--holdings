# Railway Backend Deployment (5 minutes)

## Step 1: Create Railway Account
1. Go to https://railway.app
2. Click "Start New Project"
3. Click "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select your repo: `Bdanizzyw/praedex--holdings`

## Step 2: Configure Backend Deployment
1. Railway will prompt you to select which repo to deploy from
2. Choose your `praedex--holdings` repo
3. In the deployment settings:
   - **Root Directory**: `backend/`
   - **Start Command**: `npm start`
   - **Port**: `5000`

## Step 3: Add Environment Variables
Railway dashboard → Your project → Variables

Add:
```
PORT=5000
NODE_ENV=production
```

Click "Deploy"

## Step 4: Get Your Backend URL
1. Railway deploys automatically
2. Once deployed, click on your service
3. Copy the **"Public Domain"** URL (looks like: `https://praedex-api.railway.app`)
4. Your API endpoint will be: `https://praedex-api.railway.app/api`

## Step 5: Configure Vercel with Backend URL
1. Go to https://vercel.com
2. Your project → Settings → Environment Variables
3. Add:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-url/api
   ```
   (Replace with your actual Railway URL)

4. Go to Deployments → Redeploy latest commit

## Done! 🎉
- Frontend: https://praedex--holdings.vercel.app
- Backend: https://your-railway-url

Test by clicking "Find Property" on the site!

## Troubleshooting

**"Failed to load properties"?**
- Check NEXT_PUBLIC_API_URL is correct in Vercel
- Verify backend is running on Railway (should show "Active")
- Check browser console for exact error

**Backend won't start?**
- Ensure `backend/package.json` has `"start": "node server.js"`
- Check logs in Railway dashboard for errors
- Verify PORT=5000 is set

**CORS errors?**
- Already configured in your backend
- No additional setup needed
