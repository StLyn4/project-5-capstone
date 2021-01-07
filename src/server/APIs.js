const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const Weatherbit_API = process.env.Weatherbit_API;
const Pixabay_API = process.env.Pixabay_API;
const GeoNames_username = process.env.GeoNames_username;

// Axios global error handling
axios.interceptors.response.use(response => response, error => {
  // Log error and reject
  console.error('Error detected: ' + error);
  return Promise.reject(error);
});

module.exports = { // APIs ('address': callback())
  '/api/SentimentAnalysis': async (text) => { // Example
    if (text) {
      const result = await axios.get(
        'https://api.meaningcloud.com/sentiment-2.1', {
          params:
          {
            key: API_KEY,
            lang: 'auto',
            ilang: 'en',
            txt: text,
            egp: 'y',
            uw: 'y'
          }
        });
      return {
        status: result.data.status.code === '0' ? 'ok' : 'err',
        data: result.data
      }
    }
  }
};
