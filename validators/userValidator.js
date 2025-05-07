const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const validateUserCreation = [
  // Validate name
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

// Validate email
body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required")
    .custom(async (email) => {
        const User = mongoose.model("User"); // Assuming you have a User model
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email is already in use");
        }
        return true;
    }),

  // Validate password
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const validateUserUpdate = [
  // Validate user ID in the route parameter
  param("userid")
    .notEmpty()
    .withMessage("User ID is required")
    .custom((value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Invalid User ID");
      }
      return true;
    }),

  // Optional: Validate name
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  // Optional: Validate email
body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required")
    .custom(async (email) => {
        const User = mongoose.model("User"); // Assuming you have a User model
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email is already in use");
        }
        return true;
    }),
  // Optional: Validate password
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateUserId = [
  // Validate user ID in the route parameter
  param("userid")
    .notEmpty()
    .withMessage("User ID is required")
    .custom((value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Invalid User ID");
      }
      return true;
    }),
];

module.exports = {
  validateUserCreation,
  validateUserUpdate,
  validateUserId,
};