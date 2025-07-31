// API Configuration
export const API_CONFIG = {
  // Replace with your actual Render backend URL
  BASE_URL: import.meta.env.VITE_API_URL || 'https://editscape-orgeditingweb.onrender.com',
  
  // Cloudinary configuration (if needed for direct uploads)
  CLOUDINARY: {
    CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your-cloud-name',
    UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'your-upload-preset',
  }
};

// Environment check
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD; 
