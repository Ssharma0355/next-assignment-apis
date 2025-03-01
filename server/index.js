require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/userModel"); // Import User Schema

const app = express();
const http = require("http").Server(app);

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend API calls

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// API route to handle POST request
app.post("/api/user", async (req, res) => {
  try {
    const {
      appname,
      appdescription,
      knowledgename,
      knowledgedescription,
      pattern,
      embeddings,
      metrics,
      chuncking,
      vectorDb,
    } = req.body;

    // Validation - Ensure all fields are present
    if (
      !appname ||
      !appdescription ||
      !knowledgename ||
      !knowledgedescription ||
      !pattern ||
      !embeddings ||
      !metrics ||
      !chuncking ||
      !vectorDb
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save data to MongoDB
    const userData = new User(req.body);
    const savedUser = await userData.save();

    res
      .status(201)
      .json({ message: "User data saved successfully", data: savedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving user data", error: error.message });
  }
});

//GET the form details
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 8080;
http.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`));
