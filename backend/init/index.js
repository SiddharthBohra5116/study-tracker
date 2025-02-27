const mongoose = require("mongoose");
const Subject = require("../models/Subject");
const Topic = require("../models/Topics");
const { subjectsData } = require("./data");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://siddharthbohra5116:9s69mKq4HTtAeyST@cluster0.p7y7e.mongodb.net/study-tracker");
    console.log("MongoDB connected successfully");

    await Subject.deleteMany(); // Clear existing subjects
    await Topic.deleteMany(); // Clear existing topics

    for (const subject of subjectsData) {
      let totalLectures = 0;
      let completedLectures = 0;
      let topicIds = [];

      for (const topic of subject.topics) {
        const newTopic = await Topic.create(topic);
        topicIds.push(newTopic._id);

        totalLectures += newTopic.totalLectures;
        completedLectures += newTopic.completedLectures;
      }

      await Subject.create({
        name: subject.name,
        topics: topicIds, // Store topic ObjectIds
        totalLectures,
        completedLectures
      });
    }

    console.log("Data inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Error inserting data:", error);
    process.exit(1);
  }
};

connectDB();
