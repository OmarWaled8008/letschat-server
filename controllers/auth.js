const User = require("../models/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const existingUser = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;
  try {
    const newUser = new User({
      username: req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      bio: req.body.bio,
      profilePic: `/uploads/${req.file.filename}`,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({
      $or: [
        { username: req.body.user.toLowerCase() },
        { email: req.body.user.toLowerCase() },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = user.createToken();
    if (!token) {
      return res.status(500).json({ message: "Server error" });
    }

    res.header("Authorization", "Bearer " + token);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error 2" });
  }
};

module.exports = {
  signup,
  login,
};
