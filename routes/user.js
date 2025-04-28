const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const validateId = require("../middlewares/validateIdUser");
const authDelUpdate = require("../middlewares/authDelUpdate");
const {
  updateUser,
  updateImage,
  deleteUser,
  getFollowersOrFollowing,
  followUser,
  unfollowUser,
  getUser,
  getAllUsers,
  addUsers,
} = require("../controllers/user");

router.patch("/:idUser", auth, authDelUpdate, validateId, updateUser);
router.delete("/:idUser", auth, authDelUpdate, validateId, deleteUser);
router.get("/followers/:idUser", auth, validateId, getFollowersOrFollowing);
router.get("/following/:idUser", auth, validateId, getFollowersOrFollowing);
router.put("/follow/:idUser", auth, followUser);
router.put("/unfollow/:idUser", auth, unfollowUser);
router.get("/:idUser", auth, getUser);
router.get("/", auth, getAllUsers);
router.get("/suggestions/:idUser", auth, validateId, addUsers);
router.patch(
  "/uploadImg/:idUser",
  auth,
  authDelUpdate,
  upload.single("profilePic"),
  updateImage
);
router.get("/logout", (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
});
module.exports = router;
