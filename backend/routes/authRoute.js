const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const verify = require("../utils/normalverification");
const {
  createUserController,
  loginController,
  fetchUserData,
} = require("../controllers/authController");

router.post(
  "/register",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5 }),
  ],
  createUserController
);

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginController
);

router.get("/gather-data", verify, fetchUserData);

module.exports = router;
