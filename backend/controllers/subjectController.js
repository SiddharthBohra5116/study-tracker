const { default: mongoose } = require("mongoose");
const Subject = require("../models/Subject");

// Create a new subject
module.exports.createSubject = async (req, res) => {
  try {
    const { name, totalLectures, completedLectures } = req.body;

    // Validate required fields
    if (!name || !totalLectures) {
      return res.status(400).json({ message: "Name and totalLectures are required" });
    }

    // Create and save the subject
    const subject = new Subject({ name, totalLectures, completedLectures });
    await subject.save();

    res.status(201).json({ message: "Subject created successfully", subject });
  } catch (error) {
    res.status(500).json({ message: "Error creating subject", error: error.message });
  }
};

// Get all subjects
module.exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({});

    if (!subjects.length) {
      return res.status(404).json({ message: "No subjects found" });
    }

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subjects", error: error.message });
  }
};

// Get a specific subject by ID
module.exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate("topics");

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subject", error: error.message });
  }
};

// Update a subject by ID
module.exports.updateSubject = async (req, res) => {
  try {
    const { name, totalLectures, completedLectures } = req.body;

    // Validate required fields
    if (!name || !totalLectures || completedLectures === undefined) {
      return res.status(400).json({ message: "All fields (name, totalLectures, completedLectures) are required" });
    }

    // Find and update the subject
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, totalLectures, completedLectures },
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({ message: "Subject updated successfully", updatedSubject });
  } catch (error) {
    res.status(500).json({ message: "Error updating subject", error: error.message });
  }
};

// Delete a subject by ID
module.exports.deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

    if (!deletedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subject", error: error.message });
  }
};