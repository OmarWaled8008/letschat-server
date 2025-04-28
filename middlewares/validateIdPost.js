const mongoose = require("mongoose");

const validateIdPost = (req, res, next) => {
  const id = req.params.id || req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  next();
};

module.exports = validateIdPost;