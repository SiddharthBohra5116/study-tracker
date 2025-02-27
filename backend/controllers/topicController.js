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
    const { subjectId, topicId } = req.params; // Get both subjectId and topicId from params
    const updatedTopic = await Topic.findByIdAndUpdate(topicId, req.body, { new: true });
    if (!updatedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    await Subject.findOneAndUpdate(
      { _id: req.params.subjectId, "topics._id": req.params.id }, // Find subject containing the topic
      { $set: { "topics.$.name": req.body.name } }, // Update specific field in the topic
      { new: true }
    );
    
    res.status(200).json({ message: "Topic updated successfully", updatedTopic });
  } catch (error) {
    console.error(error);
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
