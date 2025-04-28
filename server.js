const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5050;
const socketIo = require("socket.io");
const ioServer = require("./utils/socket");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    const appServer = app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
    const io = socketIo(appServer, {
      cors: {
        origin: process.env.CLIENT_URL,
      },
    });
    ioServer(io);
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err.message);
  });