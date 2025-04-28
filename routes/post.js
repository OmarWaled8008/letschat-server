const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  addPost,
  getPost,
  getTimelinePosts,
  getUserPosts,
  updatePost,
  deletePost,
  likePost,
  getLikes,
  updatePostImg,
} = require("../controllers/post");
const auth = require("../middlewares/auth");
const authPost = require("../middlewares/authPost");
const authUpdatePost = require("../middlewares/authUpdatePost");
const validateIdPost = require("../middlewares/validateIdPost");

router.post("/", auth, upload.single("image"), authPost, addPost);
router.get("/:id", auth, validateIdPost, getPost);
router.get("/timeline/posts", auth, getTimelinePosts);
router.get("/profile/:userId", auth, validateIdPost, getUserPosts);
router.patch("/:id", auth, authUpdatePost, validateIdPost, updatePost);
router.delete("/:id", auth, authUpdatePost, validateIdPost, deletePost);
router.post(
  "/updatePostImg/:id",
  auth,
  upload.single("image"),
  validateIdPost,
  updatePostImg
);
router.put("/like/:id", auth, validateIdPost, likePost);
router.get("/like/:id", auth, validateIdPost, getLikes);

module.exports = router;
