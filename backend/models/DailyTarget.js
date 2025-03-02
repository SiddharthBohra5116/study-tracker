const mongoose = require("mongoose");

const dailyTargetSchema = new mongoose.Schema({
  targetName: {
    type: String,
    required: true
},
completed: {
    type: Boolean,
    default: false
}
});

module.exports = mongoose.model("DailyTarget", dailyTargetSchema);
