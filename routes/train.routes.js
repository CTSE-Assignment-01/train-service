// routes\train.routes.js
const express = require("express");
const trainController = require("../controllers/train.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public routes (no authentication required)
router.get("/", trainController.getAllTrains);
router.get("/:id", trainController.getTrainById);

// Protected routes (JWT authentication required)
router.post("/", protect, trainController.createTrain);
router.put("/:id", protect, trainController.updateTrain);
router.delete("/:id", protect, trainController.deleteTrain);

module.exports = router;
