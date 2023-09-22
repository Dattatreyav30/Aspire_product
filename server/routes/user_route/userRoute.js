const express = require("express");

const router = express.Router();

const userController = require("../../controllers/user_controller/userController");
const emailAuth = require("../../middleware/emailAuth");

router.post("/signup", userController.userSignup);

router.get(
  "/verification/:userId/:uniqueId",
  emailAuth.emailAuthorization,
  userController.verification
);

router.post("/login", userController.Login);

module.exports = router;
