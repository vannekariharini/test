// index.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files in the public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve the images folder as a static resource
app.use("/images", express.static(path.join(__dirname, "images")));

// API endpoint to list images in the images folder
app.get("/api/images", (req, res) => {
  const directoryPath = path.join(__dirname, "images");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan images");
    }
    const imagePaths = files.map((file) => `/images/${file}`);
    res.json(imagePaths);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
