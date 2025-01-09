const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Remove trailing slash if present
const cleanUrl = API_URL.replace(/\/$/, '');

console.log('API URL:', cleanUrl); // Debug log

export default cleanUrl;