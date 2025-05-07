const { body, param } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../models/user"); // Import the User model to check if the user exists
const Box = require("../models/box"); // Import the Box model to validate box existence

const validateBuyABox = [
  // Validate user field
  body("user")
    .notEmpty()
    .withMessage("User ID is required")
    .custom(async (value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Invalid User ID");
      }
      const userExists = await User.findById(value);
      if (!userExists) {
        throw new Error("User ID does not exist in the User collection");
      }
      return true;
    }),

  // Validate box field
  body("box")
    .notEmpty()
    .withMessage("Box ID is required")
    .custom(async (value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Invalid Box ID");
      }
      const boxExists = await Box.findById(value);
      if (!boxExists) {
        throw new Error("Box ID does not exist in the Box collection");
      }
      return true;
    }),

  // Validate address
  body("address")
    .notEmpty()
    .withMessage("Address is required"),

  // Validate deliveryDate
  body("deliveryDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Delivery date must be a valid ISO 8601 date"),
];

const validateUserId = [
  // Validate user ID in the route parameter
  param("userid")
    .notEmpty()
    .withMessage("User ID is required")
    .custom(async (value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Invalid User ID");
      }
      const userExists = await User.findById(value);
      if (!userExists) {
        throw new Error("User ID does not exist in the User collection");
      }
      return true;
    }),
];

module.exports = {
  validateBuyABox,
  validateUserId,
};