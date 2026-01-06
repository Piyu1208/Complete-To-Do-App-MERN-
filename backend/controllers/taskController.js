const Task = require("../models/taskModel");
const asyncHandler = require("../utils/asyncHandler");

exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

exports.createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    user: req.user.id
  });
  res.status(201).json(task);
});

exports.updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(task);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  await Task.findOneAndDelete(
    { _id: req.params.id, user: req.user.id }
  );
  res.status(204).json(null);
});
