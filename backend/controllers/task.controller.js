const Task = require("../models/task.model");

const getTasks = async (req, res, next) => {
  try {
    const { title, status } = req.query;
    const query = { user: req.user.id };

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ msg: "task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = new Task({ title, description, status, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ msg: "task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ msg: "task not found" });
    }
    res.status(200).json({ msg: "task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };