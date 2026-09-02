const User = require("../models/user.model");

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { name, email } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports = { updateProfile };