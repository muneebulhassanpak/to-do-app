const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "in-progress",
  },
  recording: {
    type: String,
    default: "",
  },
});

const Todo = model("Todo", todoSchema);

module.exports = Todo;
