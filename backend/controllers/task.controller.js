const Task = require("../models/task.model");

// Create Task
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id,
    });

    const populatedTask = await task.populate("user", "name email");

    res.status(201).json(populatedTask);
  } catch (error) {
    next(error);
  }
};

// Get All Tasks for Logged-in User
exports.getTasks = async (req, res, next) => {
  try {
    const { title, status } = req.query;

    const filter = { user: req.user.id };

    if (title) {
      const escapedTitle = title.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      if (escapedTitle) {
        filter.title = { $regex: escapedTitle, $options: "i" };
      }
    }

    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get Single Task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Update Task
exports.updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("user", "name email");

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// Delete Task
exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
