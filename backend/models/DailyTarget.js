const mongoose = require("mongoose");

const dailyTargetSchema = new mongoose.Schema({
  topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  plannedLectures: { type: Number, required: true },
  completedLectures: { type: Number, default: 0 }
});

module.exports = mongoose.model("DailyTarget", dailyTargetSchema);
