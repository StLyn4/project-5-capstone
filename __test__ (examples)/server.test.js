import 'regenerator-runtime/runtime';
import SA from '../src/server/SA';

const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;

describe('Testing the server functionality', () => {
  test('API_KEY check', async () => {
    expect(API_KEY).toBeDefined();
  });
  test('Testing the SA module', async () => {
    expect(SA.analyze).toBeDefined();
    const data = await SA.analyze('Test just for test.');
    expect(data.status).toBeDefined();
    expect(data.data).toEqual(
      expect.objectContaining({
        status: expect.any(Object),
        score_tag: expect.any(String),
        agreement: expect.any(String),
        confidence: expect.any(String),
      })
    );
  });
});
