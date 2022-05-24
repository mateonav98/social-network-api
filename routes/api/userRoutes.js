const router = require("express").Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
//   addFriend,
//   removeFriend,
} = require("../../controllers/userController");

// get user and create user
router.route("/").get(getUsers).post(createUser);

//get user by by id, update, and delete
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// add friend an delete friend
// router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;