const Task = require("../models/task.model");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id,
    });

    const populatedTask = await task.populate("user", "name email");
    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Tasks for Logged-in User
exports.getTasks = async (req, res) => {
  try {
    const { title, status } = req.query;
    const filter = { user: req.user.id };

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Task by ID
exports.getTaskById = async (req, res) => {
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
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!task) {
      return res.status(404).json({ msg: "task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) {
      return res.status(404).json({ msg: "task not found" });
    }
    res.status(200).json({ msg: "task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const uploadAttachment = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "you are not the owner of this task" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "no file uploaded" });
    }

    task.attachment = req.file.path;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  uploadAttachment,
};
