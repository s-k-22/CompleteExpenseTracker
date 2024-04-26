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

module.exports = router;
