const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Import mongoose
const userRoutes = require("./routes/userRoutes");
const channelRoutes = require("./routes/channelRoutes");
require("dotenv").config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", channelRoutes);
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
