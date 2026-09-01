const Task = require("../models/task.model");

const checkTaskOwnership = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Checking if the task belongs to the authenticated user
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to modify this task" });
    }

    req.task = task;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = checkTaskOwnership;