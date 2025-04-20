// server.js
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const mongoDB = process.env.MONGO_URI || "mongodb+srv://esithakavisara:aaa@cluster0.lswajj6.mongodb.net/";

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("MongoDB connection successful");

    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
