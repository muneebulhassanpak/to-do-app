const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createTodoController,
  editTodoStatusController,
  editTodoBodyController,
  deleteTodoController,
} = require("../controllers/todoController");
const verify = require("../utils/normalverification");

// Creating New todo
router.post(
  "/create-new-todo",
  verify,
  [
    body("title")
      .notEmpty()
      .withMessage("Title of Todo is required")
      .isLength({ min: 4 })
      .withMessage("Title must be at least 4 characters long"),

    body("description")
      .notEmpty()
      .withMessage("Description of Todo is required")
      .isLength({ min: 10 })
      .withMessage("Todo description must be at least 10 characters long"),
  ],
  createTodoController
);

// Editing Status of existing todo
router.put("/edit-todo-status/:todoid", verify, editTodoStatusController);

// Editing Contents of existing todo
router.patch(
  "/edit-todo-body/:todoid",
  verify,
  [
    body("title")
      .notEmpty()
      .withMessage("Title of Todo is required")
      .isLength({ min: 4 })
      .withMessage("Title must be at least 4 characters long"),

    body("description")
      .notEmpty()
      .withMessage("Description of Todo is required")
      .isLength({ min: 10 })
      .withMessage("Todo description must be at least 10 characters long"),
  ],
  editTodoBodyController
);

// Deleting an existing todo
router.delete("/delete-todo/:todoid", verify, deleteTodoController);

module.exports = router;
