const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topics: [
    {
      type: Schema.Types.ObjectId, ref: "Topic" 
    }
  ],
  totalLectures: { type: Number, required: true },
  completedLectures: { type: Number, required: true }
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
