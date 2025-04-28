const express = require("express");
const router = express.Router();
const ajvUser = require("../middlewares/ajvUserMiddleware");
const { signup, login } = require("../controllers/auth");
const upload = require("../middlewares/multer");
const validateAuth = require("../middlewares/validateAuth");

router.post("/signup", upload.single("profilePic"), ajvUser, signup);
router.post("/login", validateAuth, login);

module.exports = router;
