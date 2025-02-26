const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topics: [
    {
      topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
      name : {type: String, required: true},
      totalLectures: { type: Number, required: true },
      completedLectures: { type: Number, required: true }
    }
  ],
  totalLectures: { type: Number, required: true },
  completedLectures: { type: Number, required: true }
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
