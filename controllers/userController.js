const User = require("../models/user"); // Import the User model
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: "User not found" + err.message });
  }
};

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
    let user = new User({ ...req.body, password: hashedPassword });
    await user.save(); // Save the new user to the database
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userid;

  // Check if password is being updated
  if (req.body.password) {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10); // Hash the new password
    } catch (error) {
      console.error("Error hashing password:", error);
      return res
        .status(500)
        .json({ message: "Failed to update user", error: error.message });
    }
  }

  try {
    let user = await User.findByIdAndUpdate(userId, req.body, { new: true }); // Find the user by ID and update
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userid;
    let user = await User.findByIdAndDelete(userId); // Find the user by ID and delete
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
