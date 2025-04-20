// app.js
const express = require("express");
const cors = require("cors");
const trainRoutes = require("./routes/train.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/trains", trainRoutes);
app.use("/users", userRoutes);

app.get("/test", (req, res) => {
  res.send("Server is working!");
});

module.exports = app;
