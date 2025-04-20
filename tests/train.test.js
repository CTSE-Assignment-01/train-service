const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../app");
const Train = require("../models/train.model");

describe("Train API", () => {
  let token;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    // Clean up the train collection
    await Train.deleteMany({});

    // Generate a JWT token (mock user)
    const mockUserId = new mongoose.Types.ObjectId();
    token = jwt.sign({ id: mockUserId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
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

      const res = await request(app)
        .post("/trains")
        .set("Authorization", `Bearer ${token}`)
        .send(newTrain);

      console.log("POST /trains response:", res.body); // Debugging

      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.data.train.name).toBe(newTrain.name);

      const trainInDb = await Train.findOne({ name: newTrain.name });
      expect(trainInDb).toBeTruthy();
    });
  });

  describe("GET /trains", () => {
    test("should return a list of trains", async () => {
      const res = await request(app)
        .get("/trains")
        .set("Authorization", `Bearer ${token}`);

      console.log("GET /trains response:", res.body); // Debugging

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data.trains)).toBe(true);
    });
  });
});
