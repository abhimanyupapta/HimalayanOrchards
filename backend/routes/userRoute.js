const express = require("express");
const userController = require("../controllers/userController");
const isAuth = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(userController.registerUser);

router.route("/login").post(userController.loginUser);

router.route("/password/forgot").post(userController.forgotPassword);

router.route("/password/reset/:token").put(userController.resetPassword);

router.route("/logout").get(userController.logout);

router.route("/me").get(isAuth.isAuthenticated, userController.getUserDetails);

router
  .route("/password/update")
  .put(isAuth.isAuthenticated, userController.updatePassword);

router
  .route("/me/update")
  .put(isAuth.isAuthenticated, userController.updateProfile);

router
  .route("/admin/users")
  .get(
    isAuth.isAuthenticated,
    isAuth.authorizeRoles("admin"),
    userController.getAllUser
  );

router
  .route("/admin/user/:id")
  .get(
    isAuth.isAuthenticated,
    isAuth.authorizeRoles("admin"),
    userController.getSingleUser
  )
  .put(
    isAuth.isAuthenticated,
    isAuth.authorizeRoles("admin"),
    userController.updateUserRole
  )
  .delete(
    isAuth.isAuthenticated,
    isAuth.authorizeRoles("admin"),
    userController.deleteUser
  );

router
  .route("/admin/contact")
  .post(
    isAuth.isAuthenticated,
    isAuth.authorizeRoles("admin"),
    userController.contactAdmin
  ); 

router
  .route("/contact")
  .get(
    userController.contactGet
  )  

module.exports = router;
