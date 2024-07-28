const Todo = require("../models/Todo");
const CustomError = require("../utils/Error");
const { validationResult } = require("express-validator");
const {
  generateResponseWithPayload,
  generateResponseWithoutPayload,
} = require("../utils/helpers");

// Creating New Todo
const createTodoController = async (req, res, next) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError(400, "Incomplete/Incorrect registration fields");
    }

    const { title, description } = req.body;

    const newTodo = new Todo({
      title,
      description,
    });

    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    return next(error);
  }
};

// Editing Status of Existing Todo
const editTodoStatusController = async (req, res, next) => {
  try {
    const { todoid } = req.params;
    const { status } = req.body;

    const validStatuses = ["in-progress", "completed"];
    if (!validStatuses.includes(status)) {
      throw new CustomError(400, "Invalid status");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoid,
      { status },
      { new: true, useFindAndModify: false }
    );

    if (!updatedTodo) {
      throw new CustomError(404, "Todo not found");
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    return next(error);
  }
};

// Editing Contents of Existing Todo
const editTodoBodyController = async (req, res, next) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomError(400, "Incomplete/Incorrect todo fields");
    }

    const { todoid } = req.params;
    const { title, description } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoid,
      { title, description },
      { new: true, useFindAndModify: false }
    );

    if (!updatedTodo) {
      throw new CustomError(404, "Todo not found");
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    return next(error);
  }
};

// Deleting an Existing Todo
const deleteTodoController = async (req, res, next) => {
  try {
    const { todoid } = req.params;

    const todo = await Todo.findByIdAndDelete(todoid);

    if (!todo) {
      throw new CustomError(404, "Todo not found");
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

const getAllTodosController = async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    // Send the response
    res.status(200).json(todos);
  } catch (error) {
    // Pass any errors to the error handling middleware
    return next(error);
  }
};

module.exports = {
  createTodoController,
  editTodoStatusController,
  editTodoBodyController,
  deleteTodoController,
  getAllTodosController,
};
