const Post = require("../models/Post");
const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  const { postId } = req.params;
  const { userId, text } = req.body;
  try {
    const comment = new Comment({ postId, userId, text });
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    post.comments.push(comment._id);
    await post.save();
    await comment.save();
    return res.status(201).send(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId }).populate("userId", {
      password: 0,
    });
    if (!comments) {
      return res.status(404).send({ message: "No comments found" });
    }
    return res.status(200).send(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { postId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    post.comments.splice(post.comments.indexOf(commentId), 1);
    await post.save();
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).send({ message: "Comment not found" });
    }
    return res.status(200).send({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { createComment, getComments, deleteComment };
