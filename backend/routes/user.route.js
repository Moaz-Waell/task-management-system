const express = require("express");
const router = express.Router();
const authenticated = require("../middlewares/authenticated.middleware");
const { updateProfile } = require("../controllers/user.controller");

router.put("/:id", authenticated, updateProfile);

module.exports = router;