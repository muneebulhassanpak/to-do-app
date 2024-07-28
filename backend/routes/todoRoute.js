const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createTodoController,
  editTodoStatusController,
  editTodoBodyController,
  deleteTodoController,
  getAllTodosController,
} = require("../controllers/todoController");

// Creating New todo
router.post(
  "/create-new-todo",
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
router.put("/edit-todo-status/:todoid", editTodoStatusController);

// Editing Contents of existing todo
router.patch(
  "/edit-todo-body/:todoid",
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
router.delete("/delete-todo/:todoid", deleteTodoController);

router.get("/get-todos", getAllTodosController);

module.exports = router;
