const Task = require("../models/task.model");

const checkTaskOwnership = async (req, res, next) => {
  try {
    console.log("-----------------------------------------");
    console.log("Req Params ID:", req.params.id);
    console.log("Req User from JWT:", req.user);

    const task = await Task.findById(req.params.id);
    console.log("Found Task from DB:", task);

    if (!task) {
      console.log("--> Task NOT found in Database!");
      return res.status(404).json({ message: "Task not found" });
    }

    const authenticatedUserId = (req.user._id || req.user.id)?.toString();
    const taskOwnerId = (task.user._id || task.user)?.toString();

    console.log("Task Owner ID:", taskOwnerId);
    console.log("Auth User ID:  ", authenticatedUserId);

    if (taskOwnerId !== authenticatedUserId) {
      console.log("--> Ownership Match FAILED!");
      return res.status(403).json({
        message: "Not authorized to modify this task",
      });
    }

    req.task = task;
    next();
  } catch (error) {
    console.error("Error in Middleware:", error);
    next(error);
  }
};

module.exports = checkTaskOwnership;