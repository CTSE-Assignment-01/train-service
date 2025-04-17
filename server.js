require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const trainRoutes = require("./routes/train.routes");
const userRoutes = require("./routes/user.routes");

const mongoDB = "mongodb+srv://esithakavisara:aaa@cluster0.lswajj6.mongodb.net/";

// Connect to MongoDB
mongoose
  .connect(mongoDB)
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// User routes
app.use("/trains", trainRoutes);
app.use("/users", userRoutes);

app.get("/test", (req, res) => {
  res.send("Server is working!");
});


const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
