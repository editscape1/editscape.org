# Deployment Guide - EDITSCAPE

## Current Setup
- **Frontend**: Deployed on Vercel (editscape-org.vercel.app)
- **Backend**: Deployed on Render
- **Image Storage**: Cloudinary
- **Database**: SQLite (can be upgraded to PostgreSQL on Render)

## Integration Steps

### 1. Backend Deployment (Render)

1. **Deploy Backend to Render**:
   - Connect your GitHub repository to Render
   - Create a new Web Service
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `gunicorn run:app`
   - Add environment variables:
     ```
     ADMIN_API_KEY=your-secure-api-key-here
     FLASK_ENV=production
     ```

2. **Get Backend URL**:
   - After deployment, note your Render URL (e.g., `https://your-app.onrender.com`)

### 2. Frontend Configuration

1. **Set Environment Variables**:
   - In your Vercel dashboard, add environment variable:
     ```
     VITE_API_URL=https://your-app.onrender.com
     ```

2. **Update API Configuration**:
   - The frontend is already configured to use the environment variable
   - If you need to change the URL, update `frontend/src/config/api.ts`

### 3. Database Setup

1. **Initial Migration**:
   ```bash
   cd backend
   flask db upgrade
   ```

2. **Add Sample Data** (optional):
   ```bash
   # You can add portfolio items via the API
   curl -X POST https://your-app.onrender.com/portfolio/ \
     -H "Content-Type: application/json" \
     -H "x-api-key: your-secure-api-key-here" \
     -d '{
       "title": "Sample Project",
       "description": "A sample portfolio item",
       "image_url": "https://res.cloudinary.com/your-cloud/image/upload/sample.jpg",
       "link": "#"
     }'
   ```

### 4. Image Upload Integration

The current setup uses Cloudinary URLs directly. For dynamic uploads:

1. **Frontend Upload Component** (optional):
   - Create an admin interface for uploading images
   - Use Cloudinary's upload widget or direct API
   - Store the returned URL in the database

2. **Cloudinary Configuration**:
   - Set up your Cloudinary account
   - Configure upload presets for security
   - Add environment variables if needed

### 5. Testing the Integration

1. **Test Portfolio Loading**:
   - Visit your Vercel frontend
   - Click "View Portfolio"
   - Should load data from your Render backend

2. **Test Contact Form**:
   - Fill out the contact form
   - Should send data to your Render backend

### 6. Security Considerations

1. **API Key Protection**:
   - Keep your `ADMIN_API_KEY` secure
   - Only use it for admin operations
   - Consider rate limiting for public endpoints

2. **CORS Configuration**:
   - The backend should allow requests from your Vercel domain
   - Update CORS settings in `backend/app/__init__.py` if needed

### 7. Monitoring

1. **Backend Logs**: Check Render dashboard for any errors
2. **Frontend Logs**: Check Vercel dashboard for build/deployment issues
3. **Database**: Monitor database size and performance

## Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure backend allows requests from Vercel domain
   - Check CORS configuration in Flask app

2. **API Connection Issues**:
   - Verify the `VITE_API_URL` environment variable
   - Check if Render service is running
   - Test API endpoints directly

3. **Image Loading Issues**:
   - Verify Cloudinary URLs are accessible
   - Check image permissions on Cloudinary
   - Ensure proper error handling in frontend

4. **Database Issues**:
   - Check if migrations have been applied
   - Verify database connection on Render
   - Consider upgrading to PostgreSQL for production

## Next Steps

1. **Add Authentication**: Implement user authentication for admin panel
2. **Image Upload**: Create admin interface for uploading portfolio images
3. **Analytics**: Add Google Analytics or similar tracking
4. **SEO**: Optimize meta tags and structured data
5. **Performance**: Implement caching and CDN for images 