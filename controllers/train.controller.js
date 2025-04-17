const Train = require("../models/train.model");

const TrainController = {
  // Create a new train
  createTrain: async (req, res) => {
    try {
      const newTrain = new Train(req.body);
      const savedTrain = await newTrain.save();
      res.status(201).json(savedTrain);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all trains
  getAllTrains: async (req, res) => {
    try {
      const trains = await Train.find();
      res.status(200).json(trains);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Get a single train by id
  getTrainById: async (req, res) => {
    try {
      const train = await Train.findById(req.params.id);
      res.status(200).json(train);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Update a train
  updateTrain: async (req, res) => {
    try {
      const updatedTrain = await Train.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedTrain);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a train
  deleteTrain: async (req, res) => {
    try {
      const deletedTrain = await Train.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Train deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = TrainController;
