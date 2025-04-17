const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  fromLocation: {
    type: String,
    required: true,
  },
  toLocation: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
});

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;
