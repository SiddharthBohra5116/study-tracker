const Topic = require("../models/Topics");
const Subject = require("../models/Subject");
const mongoose = require("mongoose")
const ObjectId= mongoose.Schema.ObjectId;

module.exports.createTopic = async (req, res) => {
  try {
    const { name, totalLectures } = req.body; // subjectId comes from route params
    const subjectId  = new mongoose.Types.ObjectId(req.params.subjectId); // subjectId is passed as part of the URL parameter
    const topic = new Topic({ name, subject: subjectId, totalLectures, completedLectures: 0 });
    await topic.save();
    await Subject.findByIdAndUpdate(subjectId, { $push: { topics: topic._id } });
    res.status(201).json({ message: "Topic created successfully", topic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating topic", error });
  }
};

module.exports.getTopicsBySubject = async (req, res) => {
  try {
    const s_ID = new mongoose.Types.ObjectId(req.params.subjectId)
     const subject = await Subject.findById(s_ID).populate("topics");

     if (!subject.topics) {
      return res.status(404).json({ message: "No topics found for this subject" });
    }
    res.status(200).json(subject.topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching topics", error });
  }
};

module.exports.updateTopic = async (req, res) => {
  try {
    const { id } = req.params; // Get topic ID from params
    console.log("Request payload for topic update:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    // Update the entire topic document in the Topic collection
    const updatedTopic = await Topic.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json({ message: "Topic updated successfully", updatedTopic });
  } catch (error) {
    console.error("Error updating topic:", error);
    res.status(500).json({ message: "Error updating topic", error });
  }
};




module.exports.deleteTopic = async (req, res) => {
  try {
    const { subjectId, id } = req.params;

    await Subject.findByIdAndUpdate(subjectId, { $pull: { topics: id } });
    const deletedTopic = await Topic.findByIdAndDelete(id);
    if (!deletedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting topic", error });
  }
};
