const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const validateOrderCreation = [
    body("user")
        .notEmpty()
        .withMessage("User ID is required")
        .custom((value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Invalid User ID");
            }
            return true;
        }),

    body("box")
        .notEmpty()
        .withMessage("Box ID is required")
        .custom((value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Invalid Box ID");
            }
            return true;
        }),

    body("address")
        .notEmpty()
        .withMessage("Address is required"),

    body("deliveryDate")
        .notEmpty()
        .withMessage("Delivery date is required")
        .isISO8601()
        .toDate()
        .withMessage("Delivery date must be a valid ISO 8601 date"),
];

const validateOrderUpdate = [
    param("orderid")
        .notEmpty()
        .withMessage("Order ID is required")
        .custom((value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Invalid Order ID");
            }
            return true;
        }),
    body("user")
        .optional()
        .notEmpty()
        .withMessage("User ID is required")
        .custom((value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Invalid User ID");
            }
            return true;
        }),

    body("box")
        .optional()
        .notEmpty()
        .withMessage("Box ID is required")
        .custom((value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Invalid Box ID");
            }
            return true;
        }),

    body("address")
        .optional()
        .notEmpty()
        .withMessage("Address is required"),

    body("deliveryDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("Delivery date must be a valid ISO 8601 date"),
];

const validateOrderId = [
    param("orderid")
        .notEmpty()
        .withMessage("Order ID is required")
        .custom((value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Invalid Order ID");
            }
            return true;
        }),
];

const validateUserId = [
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
    validateOrderCreation,
    validateOrderUpdate,
    validateOrderId,
    validateUserId,
};
