const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Train = require("../models/train.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

describe("Train API", () => {
  let token;
  let testUser;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    await Train.deleteMany({});
    await User.deleteMany({});

    // Create a real user in the DB
    testUser = await User.create({
      name: "Test User",
      email: "train@test.com",
      password: "password123",
      phoneNumber: "1234567890",
      nic: "123456789V"
    });

    // Sign a JWT token with that user's ID
    token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
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
