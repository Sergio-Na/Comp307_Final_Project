const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose
require("dotenv").config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
// app.use(require("./routes/Channels"));

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
