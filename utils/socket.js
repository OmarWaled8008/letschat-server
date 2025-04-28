const mongoose = require("mongoose");
const Chat = require("../models/Chat");
const Message = require("../models/Message");

let users = [];

function addUser(obj) {
  if (!users.some((user) => user.socketId === obj.socketId)) {
    users.push(obj);
  }
}

function removeUser(socketId) {
  users = users.filter((user) => user.socketId !== socketId);
}

function getUser(userId) {
  return users.find((user) => user.userId === userId);
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New socket connection:", socket.id);

    socket.on("join", ({ userId }) => {
      console.log(`User ${userId} joined with socket ID: ${socket.id}`);
      addUser({ userId, socketId: socket.id });
      console.log("Current users:", users);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", async (message) => {
      console.log("Received message:", message);

      try {
        const newMessage = new Message({
          senderId: message.senderId,
          chatId: message.chatId,
          text: message.text,
        });
        await newMessage.save();

        const chat = await Chat.findById(message.chatId);
        if (!chat) {
          console.error("Chat not found:", message.chatId);
          return;
        }

        const reciverId =
          message.senderId === chat.senderId.toString()
            ? chat.receiverId
            : chat.senderId;
        const reciverSocketId = getUser(reciverId.toString())?.socketId;

        if (reciverSocketId) {
          io.to(reciverSocketId).emit("getMessage", {
            senderId: message.senderId,
            text: message.text,
          });
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};
