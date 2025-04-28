const express = require("express");
const router = express.Router();

const {
  createComment,
  getComments,
  deleteComment,
} = require("../controllers/comment");
const auth = require("../middlewares/auth");

router.post("/:postId", auth, createComment);
router.get("/:postId", auth, getComments);
router.delete("/:commentId", auth, deleteComment);

module.exports = router;
