const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app=express()

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log("\n--- Incoming Request ---");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Headers:", req.headers);
    // Note: body may be empty here if body-parser is not yet run
    next();
  });
  
  app.use(cors());
  
  // Body parser middleware to parse JSON bodies
  app.use(bodyParser.json());
  
  // Log the body after parsing
  app.use((req, res, next) => {
    console.log("Request Body:", req.body);
    next();
  });
  
  // Import user routes
  const profileRoutes = require("./routes/profileRoutes");
  
  // Mount user routes under /api/user
  app.use("/api", profileRoutes);
  
  // Catch-all route for unmatched paths
  app.use((req, res) => {
    console.log("404 Not Found for:", req.method, req.originalUrl);
    res.status(404).json({ message: "Not Found" });
  });
  
  // Error handling middleware (logs error stack)
  app.use((err, req, res, next) => {
    console.error("Error Middleware:", err.stack);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
  });
  

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
