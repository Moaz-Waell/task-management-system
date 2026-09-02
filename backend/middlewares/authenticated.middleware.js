const jwt = require("jsonwebtoken");

const authenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.secret_key);

    req.user = decoded;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticated;
