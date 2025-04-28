const Post = require("../models/Post");
const upload = require("../middlewares/multer");

const addPost = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
    const post = new Post({
      userId: req.body.userId,
      caption: req.body.caption,
      image: imageUrl,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id).populate("userId", {
      username: 1,
      profilePic: 1,
    });
    if (!post) return res.status(404).json({ message: "post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
const getTimelinePosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("userId", { username: 1, profilePic: 1, email: 1 })
      .sort({ createdAt: -1 });
    if (!posts) return res.status(404).json({ message: "post not found" });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
const getUserPosts = async (req, res) => {
  const id = req.params.userId;
  try {
    const posts = await Post.find({ userId: id })
      .populate("userId", { username: 1, profilePic: 1 })
      .sort({ createdAt: -1 });
    if (!posts) return res.status(404).json({ message: "post not found" });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("userId", {
      username: 1,
      profilePic: 1,
    });
    if (!post) return res.status(404).json({ message: "post not found" });
    res.status(200).json([post, { message: "post updated successfully" }]);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: "post not found" });
    res.status(200).json([post, { message: "post deleted successfully" }]);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
const likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "post not found" });
    if (post.likes.includes(userId)) {
      post.likes.splice(post.likes.indexOf(userId), 1);
      await post.save();
      res.status(200).json([post, { message: "post unliked successfully" }]);
    } else {
      post.likes.push(userId);
      await post.save();
      res.status(200).json([post, { message: "post liked successfully" }]);
    }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
const getLikes = async (req, res) => {
  const postId = req.params.id;
  try {
    let likes = await Post.findById(postId)
      .select("likes")
      .populate("likes", { username: 1, profilePic: 1 });
    if (!likes) return res.status(404).json({ message: "post not found" });
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const updatePostImg = (req, res) => {
  const { id } = req.params;
  const filePath = req.file.filename;
  Post.findByIdAndUpdate(id, { image: filePath }, { new: true })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Image uploaded successfully", post });
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};
module.exports = {
  addPost,
  getPost,
  getTimelinePosts,
  getUserPosts,
  updatePost,
  deletePost,
  likePost,
  getLikes,
  updatePostImg,
};
