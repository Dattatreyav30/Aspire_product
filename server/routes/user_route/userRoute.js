const express = require("express");

const router = express.Router();

const userController = require("../../controllers/user_controller/userController");
const userEmployeeController = require("../../controllers/user_controller/userEmployeeController");

const emailAuth = require("../../middleware/emailAuth");
const userAuth = require("../../middleware/userAuth");

router.post("/signup", userController.userSignup);

router.get(
  "/verification/:userId/:uniqueId",
  emailAuth.emailAuthorization,
  userController.verification
);

router.post("/login", userController.Login);

router.post("/reset-password", userController.resetPasswordLink);

router.post(
  "/update-password/:userId/:uniqueId",
  emailAuth.emailAuthorization,
  userController.updatePassword
);
router.post(
  "/add-one-employee",
  userAuth,
  userEmployeeController.addOneEmploye
);
router.post(
  "/add-many-employee",
  userAuth,
  userEmployeeController.addManyEmployees
);
module.exports = router;
