const express = require("express");
const router = express.Router();
const {
  createChat,
  createMessage,
  getChats,
  getMessages,
} = require("../controllers/chat");
const auth = require("../middlewares/auth");

router.post("/", auth, createChat);
router.post("/message", auth, createMessage);
router.get("/:userId", auth, getChats);
router.get("/messages/:chatId", auth, getMessages);

module.exports = router;
