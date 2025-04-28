const Chat = require("../models/Chat");
const Message = require("../models/Message");

const createChat = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const chat = await Chat.findOne({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    if (chat) {
      return res.status(200).json(chat);
    } else {
      const newChat = new Chat({
        senderId: senderId,
        receiverId: receiverId,
      });
      await newChat.save();
      return res.status(201).json(newChat);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const newMessage = new Message({
      chatId,
      senderId,
      text,
    });
    await newMessage.save();
    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getChats = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .populate("senderId", "username profilePic email")
      .populate("receiverId", "username profilePic email");

    return res.status(200).json(chats);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId })
      .populate("senderId", "username profilePicture email")
      .populate("chatId", "senderId receiverId")
      .sort({ createdAt: 1 });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChat,
  createMessage,
  getChats,
  getMessages,
};
