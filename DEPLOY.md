# Deploy to Render

## Backend Deployment

1. Go to https://render.com and sign in with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `JayBhandarkar/skin-cancer`
4. Configure:
   - **Name**: skincare-backend
   - **Region**: Oregon (US West)
   - **Branch**: main
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. Add Environment Variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://vbhandakar9:Jay%402007%21@cluster0.pwaw9rr.mongodb.net/skincare?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=skincare_jwt_secret_key_2024_change_this_in_production
   GEMINI_API_KEY=AIzaSyAbulBE0N8qrMONaJNgWGvDbxfnym9Fgws
   ```

6. Click "Create Web Service"

7. Wait for deployment (5-10 minutes)

8. Copy your backend URL (e.g., `https://skincare-backend.onrender.com`)

## Frontend Deployment

1. Click "New +" → "Static Site"
2. Connect same repository
3. Configure:
   - **Name**: skincare-frontend
   - **Branch**: main
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `.next`

4. Add Environment Variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

5. Click "Create Static Site"

## Update Frontend API URL

After backend is deployed, update `frontend/utils/api.js`:
```javascript
const API = axios.create({
  baseURL: 'https://your-backend-url.onrender.com/api',
});
```

Then push changes:
```bash
git add .
git commit -m "Update API URL for production"
git push origin main
```

## Important Notes

- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- MongoDB Atlas IP whitelist: Add `0.0.0.0/0` to allow Render access
