const express = require("express");
const cors = require("cors");
const http = require('http');
const mongoose = require("mongoose"); // Import mongoose
const userRoutes = require("./routes/userRoutes");
const channelRoutes = require("./routes/channelRoutes");
require("dotenv").config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 5000;
const server = http.Server(app);
app.use(cors());
app.use(express.json());

const socketIO = require('socket.io')(server, {
  cors: {
      origin: "https://comp307-final-project.vercel.app/"
  }
});


app.use("/api", userRoutes);
app.use("/api", channelRoutes);
// Routes
// app.use(require("./routes/Channels"));
socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user just connected!`);

  //Listens and logs the message to the console
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.error("MongoDB connection error:", err));

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
