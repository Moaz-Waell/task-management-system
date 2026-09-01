const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const protect = require("../middlewares/auth.middleware");

router.get("/", protect, taskController.getTasks);
router.get("/:id", protect, taskController.getTaskById);
router.post("/", protect, taskController.createTask);
router.put("/:id", protect, taskController.updateTask);
router.delete("/:id", protect, taskController.deleteTask);

module.exports = router;