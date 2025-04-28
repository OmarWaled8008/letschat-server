const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
module.exports = async (req, res, next) => {
  console.log("authPost middleware", req.body);
  const id = req.body.userId;
  console.log("authPost middleware", id);
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized 5" });
    }
    
    const tknData = jwt.verify(token, process.env.JWT_SECRET);
    if (id === tknData.userId) {
      console.log("same user");
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized 6" });
  }
};
