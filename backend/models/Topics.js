const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalLectures: { type: Number, required: true },
  completedLectures: { type: Number, required: true }
});

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;
