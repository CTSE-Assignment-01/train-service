const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Train = require("../models/train.model");

describe("Train API", () => {
  let testTrain;

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

      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.data.train.name).toBe(newTrain.name);

      const trainInDb = await Train.findOne({ name: newTrain.name });
      expect(trainInDb).toBeTruthy();
    });
  });

  describe("GET /trains", () => {
    test("should return a list of trains", async () => {
      const res = await request(app).get("/trains");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data.trains)).toBe(true);
    });
  });
});
