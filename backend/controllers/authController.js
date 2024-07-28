require("dotenv").config();
const User = require("../models/User");
const CustomError = require("../utils/Error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateResponseWithoutPayload } = require("../utils/helpers");

// => Creating a user
exports.createUserController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError(400, "Incomplete/Incorrect registration fields");
    }

    const { email, password } = req.body;

    // Checking for existing user with same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError(400, "A user with the same email already exists");
    }

    // Hashing the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    const response = generateResponseWithoutPayload(
      201,
      true,
      "User Registration successful"
    );

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// => Logging a user
exports.loginController = async (req, res, next) => {
  try {
    // If user has not provided proper inputs to login, we throw error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      throw new CustomError(400, "Incomplete/Incorrect login fields");
    }

    const { email, password } = req.body;

    // We check if we really have a user with such email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new CustomError(400, "Invalid email address");
    }

    // We check if user does exists, does this password matches that we have in database
    const doPasswordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!doPasswordsMatch) {
      throw new CustomError(400, "Invalid password");
    }

    const cookieData = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY
    );

    const response = generateResponseWithoutPayload(
      201,
      true,
      "Login successful"
    );
    return res.status(200).cookie("access_token", cookieData).json(response);
  } catch (error) {
    next(error);
  }
};

// => Fetching an existing user data
exports.fetchUserData = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(500, "No such user exists");
    }

    const response = generateResponseWithoutPayload(
      200,
      true,
      "Login successful"
    );
    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};
