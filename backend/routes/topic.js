const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const topicController = require("../controllers/topicController");

// Create a new topic for a subject
router
  .route("/")
  .post(wrapAsync(topicController.createTopic))  // POST request to create topic for a specific subject
  .get(wrapAsync(topicController.getTopicsBySubject));  // GET request to get topics by subjectId

  

// Get, update, or delete a specific topic by its ID
router
  .route("/:id")
  .put(wrapAsync(topicController.updateTopic))  // PUT request to update a topic by topicId
  .delete(wrapAsync(topicController.deleteTopic));  // DELETE request to delete a topic by topicId

module.exports = router; 
