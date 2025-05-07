const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const validateSubscriptionCreation = [
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
    body("startDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("Start date must be a valid ISO 8601 date"),
    body("nextPaymentDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("Next payment date must be a valid ISO 8601 date"),
];

const validateSubscriptionUpdate = [
    param("subid")
        .notEmpty()
        .withMessage("Subscription ID is required")
        .custom((value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Invalid Subscription ID");
            }
            return true;
        }),
    body("user")
        .optional()
        .custom((value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Invalid User ID");
            }
            return true;
        }),
    body("box")
        .optional()
        .custom((value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Invalid Box ID");
            }
            return true;
        }),
    body("startDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("Start date must be a valid ISO 8601 date"),
    body("nextPaymentDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("Next payment date must be a valid ISO 8601 date"),
];

const validateSubscriptionId = [
    param("subid")
        .notEmpty()
        .withMessage("Subscription ID is required")
        .custom((value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("Invalid Subscription ID");
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
    validateSubscriptionCreation,
    validateSubscriptionUpdate,
    validateSubscriptionId,
    validateUserId,
};
