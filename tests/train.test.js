const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Train = require("../models/train.model");

describe("Train API", () => {
  beforeAll(async () => {
    // Connect to test DB if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    await Train.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST /trains", () => {
    test("should create a new train", async () => {
      const newTrain = {
        name: "Express 101",
        departureTime: "08:00",
        arrivalTime: "12:00",
        fromLocation: "City A",
        toLocation: "City B",
        date: "2025-04-25T00:00:00Z",
        class: "First",
        availableSeats: 30,
        totalSeats: 50,
      };

      const res = await request(app).post("/trains").send(newTrain);

      console.log("POST /trains response:", res.body);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.name).toBe(newTrain.name);
    });
  });

  describe("GET /trains", () => {
    test("should return a list of trains", async () => {
      const res = await request(app).get("/trains");

      console.log("GET /trains response:", res.body);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
