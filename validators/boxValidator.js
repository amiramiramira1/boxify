const { body, param, query } = require("express-validator");
const mongoose = require("mongoose");

const validateBoxCreation = [
  // Validate name
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  // Validate type
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["monthly_grocery", "mystery_box", "make-a-meal_box"])
    .withMessage("Type must be one of 'monthly_grocery', 'mystery_box', or 'make-a-meal_box'"),

  // Validate price
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  // Optional: Validate description
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),
];

const validateBoxUpdate = [
  // Validate box ID in the route parameter
  param("boxid")
    .notEmpty()
    .withMessage("Box ID is required")
    .custom((value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Invalid Box ID");
      }
      return true;
    }),

  // Optional: Validate name
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),

  // Optional: Validate type
  body("type")
    .optional()
    .isIn(["monthly_grocery", "mystery_box", "make-a-meal_box"])
    .withMessage("Type must be one of 'monthly_grocery', 'mystery_box', or 'make-a-meal_box'"),

  // Optional: Validate price
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  // Optional: Validate description
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),
];

const validateBoxId = [
  // Validate box ID in the route parameter
  param("boxid")
    .notEmpty()
    .withMessage("Box ID is required")
    .custom((value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Invalid Box ID");
      }
      return true;
    }),
];

const validateBoxType = [
  // Validate type in the route parameter
  param("type")
    .notEmpty()
    .withMessage("Box type is required")
    .isIn(["monthly_grocery", "mystery_box", "make-a-meal_box"])
    .withMessage("Type must be one of 'monthly_grocery', 'mystery_box', or 'make-a-meal_box'"),
];

const validateBudgetQuery = [
  // Validate budget in the query parameter
  query("budget")
    .notEmpty()
    .withMessage("Budget is required")
    .isFloat({ min: 0 })
    .withMessage("Budget must be a positive number"),
];

module.exports = {
  validateBoxCreation,
  validateBoxUpdate,
  validateBoxId,
  validateBoxType,
  validateBudgetQuery,
};