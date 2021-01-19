import 'regenerator-runtime/runtime';
const APIs = require('../src/server/APIs');

const dotenv = require('dotenv');
dotenv.config();
const Weatherbit_API = process.env.Weatherbit_API;
const Pixabay_API = process.env.Pixabay_API;
const GeoNames_username = process.env.GeoNames_username;

describe('Testing the server functionality', () => {
  test('API_KEYs check', () => {
    expect(Weatherbit_API).toBeDefined();
    expect(Pixabay_API).toBeDefined();
    expect(GeoNames_username).toBeDefined();
  });
  test('Checking for API existence', () => {
    expect(APIs).toBeDefined();
    expect(APIs['/api/FetchPlaceData']).toBeDefined();
  });
});
