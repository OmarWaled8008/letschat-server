const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      maxLength: 1000,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);
const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
