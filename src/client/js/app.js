// Main JS file
import axios from 'axios';

// Axios global error handling
axios.interceptors.response.use(response => response, error => {
  // Log error and reject
  console.error('Error detected: ' + error);
  return Promise.reject(error);
});
