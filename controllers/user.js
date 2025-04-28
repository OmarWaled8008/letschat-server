const User = require("../models/User");

const updateUser = async (req, res) => {
  const id = req.params.idUser;
  console.log("updateUser", req.body, id);
  if (req.body.email || req.body.username) {
    const existingUser = await User.findOne({
      _id: { $ne: id },
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
  }
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select({ password: 0 });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateImage = (req, res) => {
  const { idUser } = req.params;
  User.findByIdAndUpdate(
    idUser,
    { profilePic: `/uploads/${req.file.filename}` },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "Image uploaded successfully", user });
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};

const deleteUser = async (req, res) => {
  const id = req.params.idUser;
  try {
    const user = await User.findByIdAndDelete(id, req.body);
    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getFollowersOrFollowing = async (req, res) => {
  const id = req.params.idUser;
  const url = req.url;
  try {
    const user = await User.findById(id);
    if (user) {
      const F = url.includes("followers") ? user.followers : user.following;
      const followingList = await User.find({ _id: { $in: F } });
      res.json(followingList);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const followUser = async (req, res) => {
  const id = req.params.idUser;
  try {
    const user = await User.findById(id);
    const currentUser = await User.findById(req.body._id);
    if (!user || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.followers.includes(currentUser._id)) {
      return res.status(400).json({ message: "Already following" });
    }
    if (!user.followers.includes(currentUser._id)) {
      user.followers.push(currentUser._id);
      currentUser.following.push(user._id);
      await user.save();
      await currentUser.save();
      res.json({ message: "Followed successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error1111" });
  }
};

const unfollowUser = async (req, res) => {
  const id = req.params.idUser;
  try {
    const user = await User.findById(id);
    if (user) {
      const currentUser = await User.findById(req.body._id);
      if (currentUser) {
        if (user.followers.includes(currentUser._id)) {
          user.followers = user.followers.filter(
            (follower) => follower.toString() !== currentUser._id.toString()
          );

          currentUser.following = currentUser.following.filter(
            (following) => following.toString() !== user._id.toString()
          );

          await user.save();
          await currentUser.save();
          res.json({ message: "Unfollowed successfully" });
        } else {
          res.status(400).json({ message: "Not following" });
        }
      } else {
        res.status(404).json({ message: "Current user not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  const id = req.params.idUser;
  try {
    const user = await User.findById(id, { password: 0 });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().select({
      username: 1,
      profilePic: 1,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "no users" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const addUsers = async (req, res) => {
  const id = req.params.idUser;
  try {
    const currUser = await User.findById(id);
    if (!currUser) {
      return res.status(404).json({ message: "User not found" });
    }
    let arr = Array.from(new Set(currUser.following));
    const users = await User.find({
      _id: { $nin: arr, $ne: id },
    });
    if (users) {
      res.json(users);
    } else {
      res.status(404).json({ message: "no users" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  updateUser,
  updateImage,
  deleteUser,
  getFollowersOrFollowing,
  followUser,
  unfollowUser,
  getUser,
  getAllUsers,
  addUsers,
};
