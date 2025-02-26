const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const subjectController = require("../controllers/subjectController");

// Get all subjects and create a new subject
router
  .route("/")
  .get(wrapAsync(subjectController.getAllSubjects))  // Get all subjects
  .post(wrapAsync(subjectController.createSubject));  // Create a new subject

// Get, update, and delete a specific subject by ID
router
  .route("/:id")
  .get(wrapAsync(subjectController.getSubjectById))  // Get a subject by ID
  .put(wrapAsync(subjectController.updateSubject))  // Update a subject by ID
  .delete(wrapAsync(subjectController.deleteSubject));  // Delete a subject by ID

module.exports = router;
