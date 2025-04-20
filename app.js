const express = require("express");
const cors = require("cors");
const trainRoutes = require("./routes/train.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// Disable Express version disclosure for security
app.disable('x-powered-by');

// CORS configuration (restrict access to trusted domains)
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-trusted-domain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/trains", trainRoutes);
app.use("/users", userRoutes);

// Test route
app.get("/test", (req, res) => {
  res.send("Server is working!");
});

module.exports = app;
