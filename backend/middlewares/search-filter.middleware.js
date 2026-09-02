module.exports = (req, res, next) => {
  const { title, status } = req.query;
  const statusValues = ["pending", "in-progress", "completed"];

  if (title && typeof title !== "string") {
    return res.status(400).json({
      message: "title must be a single value",
    });
  }

  if (status && typeof status !== "string") {
    return res.status(400).json({
      message: "status must be a single value",
    });
  }

  if (status && !statusValues.includes(status)) {
    return res.status(400).json({
      message: "status must be pending, in-progress or completed",
    });
  }

  next();
};