const express = require("express");
const {
  registerUser,
  userLogin,
  logOutUser,
  forgotPassword,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/logIn").post(userLogin);
router.route("/logOut").post(logOutUser);
router.route("/forgotPassword").post(forgotPassword);

module.exports = router;
