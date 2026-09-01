module.exports = (err, req, res, next) => {
  // 1. Mongoose Validation Error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: Object.values(err.errors).map((error) => error.message),
    });
  }

  // 2. Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      message: `${field} already exists`,
    });
  }

  // 3. Invalid ObjectId / Cast Error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: `Invalid ${err.path}`,
    });
  }

  // 4. Custom Error
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  // 5. Unknown / Server Error
  return res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};
