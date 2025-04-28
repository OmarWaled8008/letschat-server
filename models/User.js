const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      max: 150,
      default: "",
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true, strict: "throw" }
);

userSchema.method("createToken", function () {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "server error auth" });
  }
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET);
  return token;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
