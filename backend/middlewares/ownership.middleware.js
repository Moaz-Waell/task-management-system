const Task = require("../models/task.model");

const checkTaskOwnership = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const authenticatedUserId = (req.user._id || req.user.id)?.toString();
    const taskOwnerId = (task.user._id || task.user)?.toString();

    if (taskOwnerId !== authenticatedUserId) {
      return res.status(403).json({ 
        message: "Not authorized to modify this task" 
      });
    }

    req.task = task;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkTaskOwnership;