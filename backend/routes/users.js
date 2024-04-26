const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const authController = require("../middlewares/auth");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post(
  "/updateProfile",
  authController.authenticate,
  userController.updateProfile
);

router.get(
  "/updateProfile",
  authController.authenticate,
  userController.getProfileDetails
);

router.post("/sendEmailLink", userController.sendEmailLink);

router.get("/resetPassword/:id", userController.resetPassword);

router.get("/updatePassword/:id", userController.updatePassword);

module.exports = router;
