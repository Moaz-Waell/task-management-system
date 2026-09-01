module.exports = (req, res, next) => {
  const { status } = req.query;
  const statusValues = ["pending", "in-progress", "done"];

  if (status && !statusValues.includes(status)) {
    return res.status(400).json({
      message: "status must be pending, in-progress or done",
    });
  }

  next();
};