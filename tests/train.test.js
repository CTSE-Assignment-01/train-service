// tests/train.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

describe("Train API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("GET /trains - should return list of trains", async () => {
    const res = await request(app).get("/trains");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
