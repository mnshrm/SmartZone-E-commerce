const express = require("express");
const {
  registerUser,
  userLogin,
  logOutUser,
  forgotPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUserDetails,
  getSingleUserDetails,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const { isAuthenticated, authorizeRole } = require("../middleware/auth.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/logIn").post(userLogin);
router.route("/logOut").post(logOutUser);
// router.route("/forgotPassword").post(forgotPassword);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, updateUserPassword);
router.route("/me/update").put(isAuthenticated, updateUserProfile);

router
  .route("/admin/allUsers")
  .get(isAuthenticated, authorizeRole("admin"), getAllUserDetails);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRole("admin"), getSingleUserDetails);

router
  .route("/admin/updateUserRole/:id")
  .put(isAuthenticated, authorizeRole("admin"), updateUserRole);

router
  .route("/admin/deleteUser/:id")
  .delete(isAuthenticated, authorizeRole("admin"), deleteUser);

module.exports = router;
