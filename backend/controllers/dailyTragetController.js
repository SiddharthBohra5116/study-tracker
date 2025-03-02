const DailyTarget = require("../models/DailyTarget");

module.exports.createDailyTarget = async (req, res) => {
  try {
    const { targetName } = req.body;
    const target = new DailyTarget({ targetName });
    await target.save();
    res.status(201).json({ message: "Daily target created successfully", target });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating daily target", error });
  }
};

module.exports.getAllDailyTargets = async (req, res) => {
  try {
    const targets = await DailyTarget.find();
    res.status(200).json(targets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching daily targets", error });
  }
};

module.exports.updateDailyTarget = async (req, res) => {
  try {
    const updatedTarget = await DailyTarget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTarget) {
      return res.status(404).json({ message: "Daily target not found" });
    }
    res.status(200).json({ message: "Daily target updated successfully", updatedTarget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating daily target", error });
  }
};

module.exports.deleteDailyTarget = async (req, res) => {
  try {
    const deletedTarget = await DailyTarget.findByIdAndDelete(req.params.id);
    if (!deletedTarget) {
      return res.status(404).json({ message: "Daily target not found" });
    }
    res.status(200).json({ message: "Daily target deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting daily target", error });
  }
};
