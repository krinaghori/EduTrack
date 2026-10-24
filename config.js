/**
 * EduTrack Global Client Configuration
 * Configure your live backend API URL below:
 */
(function() {
  const isLocal = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1' || 
                  window.location.protocol === 'file:';

  // In production (Netlify), set your Render backend URL here:
  // Example: 'https://edutrack-backend.onrender.com'
  const PRODUCTION_BACKEND_URL = ''; 

  window.EDUTRACK_API_URL = isLocal 
    ? 'http://localhost:5000' 
    : (PRODUCTION_BACKEND_URL || '');
})();
