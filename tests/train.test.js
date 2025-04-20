const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
require('dotenv').config();

describe('Train API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /trains - should return list of trains', async () => {
    const response = await request(app).get('/trains');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
