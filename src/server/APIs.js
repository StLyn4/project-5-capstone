const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const Weatherbit_API = process.env.Weatherbit_API;
const Pixabay_API = process.env.Pixabay_API;
const GeoNames_username = process.env.GeoNames_username;

// Axios global error handling
axios.interceptors.response.use(response => response, error => {
  // Log error and reject
  console.warn('Error detected: ' + error);
  return Promise.reject(error);
});

const fetchGeonamesData = async placeName => {
  const result = await axios.get(
    'http://api.geonames.org/searchJSON', {
    params:
    {
      q: placeName,
      maxRows: 1,
      username: GeoNames_username
    }
  });
  return result.data;
};

const findPhoto = async request => {
  const result = await axios.get(
    'https://pixabay.com/api/', {
      params:
      {
        key: Pixabay_API,
        q: request,
        image_type: 'photo',
        orientation: 'horizontal'
      }
    });
  return result.data;
};

const fetchWeather = async (lat, lon) => {
  const result = await axios.get(
    ' https://api.weatherbit.io/v2.0/forecast/daily', {
      params:
      {
        key: Weatherbit_API,
        units: 'I',
        lat: lat,
        lon: lon
      }
    });
  return result.data;
};

module.exports = { // APIs ('address': callback())
  '/api/FetchPlaceData': async (req, res) => { // Example
    const placeName = req.query.placeName;
    if (placeName) {
      const geonamesResult = (await fetchGeonamesData(placeName)).geonames[0];
      if (geonamesResult) {
        const lng = geonamesResult.lng;
        const lat = geonamesResult.lat;
        const origName = geonamesResult.name;
        const countryName = geonamesResult.countryName;

        const pixabayPlaceResult = await findPhoto(`${origName}+(${countryName})`);
        let img;
        if (pixabayPlaceResult.total === 0) {
          const pixabayCountryResult = await findPhoto(`${countryName}`);
          if (pixabayPlaceResult.total === 0) {
            img = {
              ok: false,
              data: `https://placedog.net/500`
            };
          } else {
            img = {
              ok: true,
              data: pixabayPlaceResult.hits[0].webformatURL
            };
          }
        } else {
          img = {
            ok: true,
            data: pixabayPlaceResult.hits[0].webformatURL
          };
        }

        const weatherResult = await fetchWeather(lat, lng);
        const weatherData = {};
        const dateWeatherFormat = new Intl.DateTimeFormat('en-EN', {
          month: '2-digit', day: '2-digit'
        });
        for (let day of weatherResult.data) {
          weatherData[dateWeatherFormat.format(new Date(day.valid_date))] = {
            tempF: day.temp,
            icon: `https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`,
            comment: day.weather.description,
          };
        }

        res.json({
          img, weatherData
        });
      } else {
        res.json({
          img: {
            ok: false,
            data: `https://placedog.net/500`
          }, weatherData: {}
        });
      }
    }
  }
};
