const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const subjectRoutes = require("./routes/subject");
const topicRoutes = require("./routes/topic");
// const dailyTargetRoutes = require("./routes/dailyTarget");

const app = express();

// CORS Configuration: Allow requests from frontend
app.use(cors({
  origin: "http://localhost:5173",  // Allow frontend on this port
  credentials: true,               // If you need to send cookies or authorization headers
}));

app.use(express.json());

// MongoDB Connection
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://siddharthbohra5116:9s69mKq4HTtAeyST@cluster0.p7y7e.mongodb.net/study-tracker";
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Serve the frontend build
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Routes
app.use("/subjects", subjectRoutes);
// app.use("/xyz/dailytargets",dailyTargetRoutes)
app.use("/subjects/:subjectId/topics", topicRoutes);


// Start the server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
