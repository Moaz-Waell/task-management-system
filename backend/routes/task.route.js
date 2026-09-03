const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const checkTaskOwnership = require("../middlewares/ownership.middleware");
const searchFilter = require("../middlewares/search-filter.middleware");
const authMiddleware = require("../middlewares/authenticated.middleware");

// 2. تطبيق الحماية على كافة المسارات لتوفير req.user
router.use(authMiddleware);

// Routes
router.post("/", taskController.createTask);
router.get("/", searchFilter, taskController.getTasks);
router.get("/:id", taskController.getTaskById);

// Routes requiring ownership check
router.put("/:id", checkTaskOwnership, taskController.updateTask);
router.delete("/:id", checkTaskOwnership, taskController.deleteTask);

module.exports = router;