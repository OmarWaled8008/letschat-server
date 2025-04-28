const mongoose = require("mongoose");
const validateId = (req, res, next) => {
  const id = req.params.idUser;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  next();
};

module.exports = validateId;
