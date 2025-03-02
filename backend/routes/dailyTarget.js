const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync"); // This ensures async handling without having to use try-catch in controllers
const dailyTargetController = require("../controllers/dailyTragetController");

// Get all daily targets and create a new daily target
router
  .route("/")
  .get(wrapAsync(dailyTargetController.getAllDailyTargets)) // Fetch all daily targets
  .post(wrapAsync(dailyTargetController.createDailyTarget)); // Create a new daily target

// Get, update, and delete a specific daily target by ID
router
  .route("/:id")
  .put(wrapAsync(dailyTargetController.updateDailyTarget)) // Update a specific daily target
  .delete(wrapAsync(dailyTargetController.deleteDailyTarget)); // Delete a specific daily target

module.exports = router;
