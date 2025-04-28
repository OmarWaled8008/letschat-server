const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

module.exports = async (req, res, next) => {
  const id = req.params.id;
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
   
    const tknData = jwt.verify(token, process.env.JWT_SECRET);
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== tknData.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    console.log("same user");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized 10" });
  }
};
