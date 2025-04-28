const multer = require("multer");
const User = require("../models/User");

const path = require("path");
const uploadDir = path.join(__dirname, "../uploads");
const storage = multer.diskStorage({
  async destination(req, file, cb) {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
module.exports = upload;
