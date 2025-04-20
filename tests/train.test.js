const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest');
const User = require('../models/user.model'); // Import the User model if required

describe("Train API", () => {
  let token;
  let testUser;

  beforeAll(async () => {
    // Create a mock user for JWT authentication
    testUser = new User({ email: 'test@example.com', password: 'password' });
    await testUser.save();

    // Generate a JWT token for the mock user
    token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
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
        .set("Authorization", `Bearer ${token}`) // Include JWT token
        .send(newTrain);

      console.log("POST /trains response:", res.body); // Debugging

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.name).toBe(newTrain.name);
    });
  });

  describe("GET /trains", () => {
    test("should return a list of trains", async () => {
      const res = await request(app)
        .get("/trains")
        .set("Authorization", `Bearer ${token}`) // Include JWT token
        .send();

      console.log("GET /trains response:", res.body); // Debugging

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
