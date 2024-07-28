const User = require("../models/User");
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
    const userId = req.user.id; // Assuming `verify` middleware adds `user` to the request object

    const newTodo = new Todo({
      title,
      description,
    });

    const savedTodo = await newTodo.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { todos: savedTodo._id } },
      { new: true, useFindAndModify: false }
    );
    const responsePayload = generateResponseWithPayload(
      201,
      true,
      "Todo created successfully",
      savedTodo
    );

    res.status(201).json(responsePayload);
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
    const responsePayload = generateResponseWithPayload(
      200,
      true,
      "Todo status updated successfully",
      updatedTodo
    );
    res.status(200).json(responsePayload);
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

    const responsePayload = generateResponseWithPayload(
      200,
      true,
      "Todo  updated successfully",
      updatedTodo
    );

    res.status(200).json(responsePayload);
  } catch (error) {
    return next(error);
  }
};

// Deleting an Existing Todo
const deleteTodoController = async (req, res, next) => {
  try {
    const { todoid } = req.params;
    const userId = req.user.id; // Assuming `verify` middleware adds `user` to the request object

    const todo = await Todo.findByIdAndDelete(todoid);

    if (!todo) {
      throw new CustomError(404, "Todo not found");
    }

    await User.findByIdAndUpdate(
      userId,
      { $pull: { todos: todoid } },
      { new: true, useFindAndModify: false }
    );

    const payloadresponse = generateResponseWithoutPayload(
      200,
      true,
      "Todo deleted successfully"
    );

    return res.status(200).json(payloadresponse);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTodoController,
  editTodoStatusController,
  editTodoBodyController,
  deleteTodoController,
};
