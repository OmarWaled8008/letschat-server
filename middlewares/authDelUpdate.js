const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
  const id = req.params.idUser;
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tknData = jwt.verify(token, process.env.JWT_SECRET);
    if (id === tknData.userId) {
      console.log("same user");
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
