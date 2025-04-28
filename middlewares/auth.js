const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv").config();
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tknData = jwt.verify(token, process.env.JWT_SECRET);
    if (!tknData) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(tknData.userId, { password: 0 });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("authUser middleware");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
