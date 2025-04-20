require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../app");
const Train = require("../models/train.model");
const User = require("../models/user.model");

describe("Train API", () => {
  let token;

  beforeAll(async () => {
    console.log("Connecting to test database...");
    // Connect to test DB if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    console.log("Creating a dummy user and generating token...");
    // Create a dummy user and generate token
    const mockUser = new User({
      name: "Test User",
      phoneNumber: "1234567890",
      nic: "123456789V",
      email: "testuser@example.com",   // Add email
      password: "TestPassword123",     // Add password
    });

    await mockUser.save();

    token = jwt.sign({ id: mockUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Clearing any existing train data from the database...");
    await Train.deleteMany({});
  });

  afterAll(async () => {
    console.log("Deleting test user and closing the database connection...");
    await User.deleteMany();
    await mongoose.connection.close();
  });

  describe("POST /trains", () => {
    test("should create a new train", async () => {
      console.log("Running POST /trains test...");
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

      console.log("Sending POST request to create a new train...");
      const res = await request(app)
        .post("/trains")
        .set("Authorization", `Bearer ${token}`)
        .send(newTrain);

      console.log("Checking if response status is 201 and the train is created...");
      // The server response should return the new train object
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(newTrain.name);
      expect(res.body.departureTime).toBe(newTrain.departureTime);

      console.log("Checking if the train was saved in the database...");
      // Check if train is saved in the DB
      const trainInDb = await Train.findOne({ name: newTrain.name });
      expect(trainInDb).toBeTruthy();
    });
  });

  describe("GET /trains", () => {
    test("should return a list of trains", async () => {
      console.log("Running GET /trains test...");

      // Add a train to the database first
      console.log("Adding a train to the database...");
      await Train.create({
        name: "Express 102",
        departureTime: "09:00",
        arrivalTime: "13:00",
        fromLocation: "City A",
        toLocation: "City C",
        date: "2025-04-26T00:00:00Z",
        class: "Economy",
        availableSeats: 40,
        totalSeats: 60,
      });

      console.log("Sending GET request to fetch trains...");
      const res = await request(app)
        .get("/trains")
        .set("Authorization", `Bearer ${token}`);

      console.log("Checking if response status is 200 and a list of trains is returned...");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true); // Adjusted to expect the list directly
      expect(res.body.length).toBeGreaterThan(0); // Ensuring there is at least one train in the response
    });
  });
});
